import { Box, Button, CircularProgress, TextareaAutosize } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useArticles } from '../../../../services/hooks/useArticles';
import Categories from './components/Categories';
import Elements from './components/Elements';
import ImageUpload from './components/Image';

const Articles = () => {
  const { articles, loaded, deleteArticle, updateArticle, addArticle } =
    useArticles();
  const [editMode, setEditMode] = useState(null);

  const handleSubmit = (values) => {
    if (!editMode) {
      return addArticle(
        values.content,
        values.type,
        values.categories,
        values.image,
      );
    }

    return updateArticle(
      editMode,
      values.content,
      values.type,
      values.image,
    ).then(() => setEditMode(null));
  };

  const formik = useFormik({
    initialValues: {
      type: 'general',
      title: '',
      content: '',
      categories: [],
      image: '',
    },
    onSubmit: (values, helpers) => {
      handleSubmit(values);
      helpers.resetForm();
    },
  });

  const toggleEditMode = (articleData) => {
    setEditMode(articleData.articleId);

    formik.setValues({
      type: articleData.type,
      title: articleData.title,
      content: articleData.content,
      categories: articleData.categories.map((c) => c.category),
      image: articleData.image,
    });
  };

  const exitEditMode = () => {
    setEditMode(null);
    formik.resetForm();
  };

  return (
    <Box>
      {!loaded && <CircularProgress />}
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" px={4} py={4}>
          <Box display="flex" columnGap={2}>
            <TextareaAutosize
              name="content"
              style={{
                minHeight: 200,
                width: '70%',
              }}
              label="Content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box
              width="40%"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Categories {...formik} />

              <ImageUpload {...formik} />

              <Box alignSelf="flex-end" mt={5}>
                {!editMode ? (
                  <Button type="submit" variant="contained" color="success">
                    Add Article
                  </Button>
                ) : (
                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      onClick={exitEditMode}
                      color="error"
                    >
                      Cancel
                    </Button>

                    <Button type="submit" variant="contained" color="primary">
                      Edit
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </form>

      <Elements
        articles={articles}
        onDelete={deleteArticle}
        onUpdate={toggleEditMode}
        edit={editMode}
      />
    </Box>
  );
};

export default Articles;
