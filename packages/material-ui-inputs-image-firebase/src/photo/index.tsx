import React, {FC, Fragment, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, FormHelperText, Grid, Typography} from "@material-ui/core";
import {useFormikContext, getIn} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import path from "path";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

import {TextInput} from "@trejgun/material-ui-inputs-core";
import {ProgressOverlay} from "@trejgun/material-ui-progress";
import {ConfirmationDialog} from "@trejgun/material-ui-dialog-confirmation";
import {FirebaseFileInput} from "@trejgun/material-ui-inputs-file-firebase";

import {popup} from "../popup";
import {useStyles} from "./styles";
import {useDeleteUrl} from "../utils";

interface IPhotoInputProps {
  name: string;
  label?: string;
  accept?: string | string[];
}

export const PhotoInput: FC<IPhotoInputProps> = props => {
  const {name, label, accept} = props;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const value = getIn(formik.values, name);
  const touched = getIn(formik.touched, name);

  const classes = useStyles();
  const {formatMessage} = useIntl();
  const deleteUrl = useDeleteUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteImageDialogOpen, setIsDeleteImageDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const suffix = name.split(".").pop() as string;
  const localizedLabel = label === void 0 ? formatMessage({id: `form.labels.${suffix}`}) : label;
  const localizedHelperText = error ? formatMessage({id: error}, {label: localizedLabel}) : "";

  const handleOptionDelete = (index: number): (() => void) => {
    return (): void => {
      setSelectedImageIndex(index);
      setIsDeleteImageDialogOpen(true);
    };
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    const newValue = getIn(formik.values, name);
    const [deleted] = newValue.splice(selectedImageIndex, 1);
    const fileName = path.basename(new URL(deleted.imageUrl).pathname);

    await deleteUrl(fileName);

    formik.setFieldValue(name, newValue);
    setIsDeleteImageDialogOpen(false);
  };

  const handleDeleteCancel = (): void => {
    setIsDeleteImageDialogOpen(false);
  };

  const handleFileChange = (urls: Array<string>): void => {
    setIsLoading(true);
    const newValue = getIn(formik.values, name);
    urls.forEach(imageUrl => {
      newValue.push({
        imageUrl,
        title: "",
      });
    });
    formik.setFieldValue(name, newValue);
    setIsLoading(false);
  };

  const handleDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setIsLoading(true);

    const newValue = getIn(formik.values, name);
    const [removed] = newValue.splice(result.source.index, 1);
    newValue.splice(result.destination.index, 0, removed);

    formik.setFieldValue(name, newValue);
    setIsLoading(false);
  };

  return (
    <Fragment>
      <Typography>
        <FormattedMessage id={`form.labels.${name}`} />
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {provided => (
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className={classes.images}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Grid item>
                <ProgressOverlay isLoading={isLoading}>
                  <FirebaseFileInput onChange={handleFileChange} classes={{root: classes.media}} accept={accept} />
                </ProgressOverlay>
              </Grid>
              {value.map((option: {imageUrl: string; title: string}, i: number) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {provided => (
                    <Grid item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Card>
                        <CardMedia image={option.imageUrl} onClick={popup(option.imageUrl)} className={classes.media} />
                        <CardContent>
                          <TextInput name={`${name}[${i}].title`} value={option.title} />
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary" onClick={handleOptionDelete(i)}>
                            <FormattedMessage id="form.buttons.delete" />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {touched && error && (
        <FormHelperText id={`${name}-helper-text`} error>
          {localizedHelperText}
        </FormHelperText>
      )}

      <ConfirmationDialog open={isDeleteImageDialogOpen} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm}>
        <FormattedMessage id="dialogs.delete" values={value[selectedImageIndex]} />
      </ConfirmationDialog>
    </Fragment>
  );
};
