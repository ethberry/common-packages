import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { parse, stringify } from "qs";
import useDeepCompareEffect from "use-deep-compare-effect";

import { IIdBase, IPaginationResult, IPaginationDto } from "@gemunion/types-collection";
import { ApiError, useApi } from "@gemunion/provider-api";
import { defaultItemsPerPage } from "@gemunion/constants";

import { decoder } from "./utils";

export interface ICollectionHook<T, S> {
  baseUrl: string;
  embedded?: boolean;
  empty?: Partial<T>;
  search?: Partial<S>;
  filter?: (data: Partial<T>) => any;
  redirect?: (baseUrl: string, search: Omit<S, "skip" | "take">, id?: number) => string;
}

const defaultFilter = <T extends IIdBase>({ id: _id, ...rest }: Partial<T>) => rest;
const defaultRedirect = <S extends IPaginationDto>(baseUrl: string, search: Omit<S, "skip" | "take">, id?: number) =>
  id ? `${baseUrl}/${id}` : `${baseUrl}?${stringify(search)}`;

export const useCollection = <T extends IIdBase = IIdBase, S extends IPaginationDto = IPaginationDto>(
  options: ICollectionHook<T, S>,
) => {
  const {
    empty = {},
    search: data = {},
    baseUrl,
    embedded,
    filter = defaultFilter,
    redirect = defaultRedirect,
  } = options;

  const { id } = embedded ? { id: "" } : useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const api = useApi();

  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFilterOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [list, setList] = useState<Array<T>>([]);
  const [count, setCount] = useState<number>(0);
  const [selected, setSelected] = useState<T>(empty as T);

  const [search, setSearch] = useState<S>({
    skip: 0,
    take: defaultItemsPerPage,
    ...data,
    ...parse(location.search.substring(1), { decoder }),
  } as unknown as S);

  const updateQS = (id?: number) => {
    if (embedded) {
      return;
    }
    const { skip: _skip, take: _take, ...rest } = search;
    navigate(redirect(baseUrl, rest, id));
  };

  const fetchCollectionsByQuery = async (): Promise<void> => {
    return api
      .fetchJson({
        url: baseUrl,
        data: search,
      })
      .then((json: IPaginationResult<T>) => {
        setList(json.rows);
        setCount(json.count);
        updateQS();
      });
  };

  const fetchCollectionsById = async (id: string): Promise<void> => {
    return api
      .fetchJson({
        url: `${baseUrl}/${id}`,
      })
      .then((json: T) => {
        setList([json]);
        setCount(1);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleEdit(json)();
      });
  };

  const fetchCollections = async (id?: string): Promise<void> => {
    setIsLoading(true);
    return (id ? fetchCollectionsById(id) : fetchCollectionsByQuery())
      .catch((e: ApiError) => {
        if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAdd = (): void => {
    setSelected(empty as T);
    setIsEditDialogOpen(true);
  };

  const handleEdit = (collection: T): (() => void) => {
    return (): void => {
      setSelected(collection);
      setIsEditDialogOpen(true);
      updateQS(collection.id);
    };
  };

  const handleEditCancel = (): void => {
    setIsEditDialogOpen(false);
    updateQS();
  };

  const handleEditConfirm = (values: Partial<T>, formikBag: any): Promise<void> => {
    const { id } = values;
    return api
      .fetchJson({
        url: id ? `${baseUrl}/${id}` : baseUrl,
        method: id ? "PUT" : "POST",
        data: filter(values),
      })
      .then(() => {
        enqueueSnackbar(formatMessage({ id: id ? "snackbar.updated" : "snackbar.created" }), { variant: "success" });
        setIsEditDialogOpen(false);
        return fetchCollections();
      })
      .catch((e: ApiError) => {
        if (e.status === 400) {
          formikBag.setErrors(e.getLocalizedValidationErrors());
        } else if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  const handleDelete = (collection: T): (() => void) => {
    return (): void => {
      setSelected(collection);
      setIsDeleteDialogOpen(true);
    };
  };

  const handleDeleteCancel = (): void => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = (collection: T): Promise<void> => {
    return api
      .fetchJson({
        url: `${baseUrl}/${collection.id}`,
        method: "DELETE",
      })
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.deleted" }), { variant: "success" });
        return fetchCollections();
      })
      .catch((e: ApiError) => {
        if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      })
      .finally(() => {
        setIsDeleteDialogOpen(false);
      });
  };

  const handleChangePage = (_e: ChangeEvent<unknown>, page: number) => {
    setSearch({
      ...search,
      skip: (page - 1) * search.take,
    });
  };

  const handleSubmit = (values: S): void => {
    setSearch({
      ...values,
      skip: 0,
      take: defaultItemsPerPage,
    });
  };

  const handleToggleFilters = () => {
    setIsFilterOpen(!isFiltersOpen);
  };

  useDeepCompareEffect(() => {
    void fetchCollections(id);
  }, [search]);

  return {
    list,
    count,
    search,
    selected,

    isLoading,
    isFiltersOpen,
    isDeleteDialogOpen,
    isEditDialogOpen,

    handleAdd,
    handleEdit,
    handleEditCancel,
    handleEditConfirm,
    handleDelete,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleSubmit,
    handleChangePage,
    handleToggleFilters,
  };
};
