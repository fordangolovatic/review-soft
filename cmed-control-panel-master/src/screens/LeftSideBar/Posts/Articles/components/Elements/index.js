import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@mui/material';

const Elements = ({ articles, onDelete, onUpdate, edit }) => {
  const handleEdit = (articleDetails) => {
    onUpdate(articleDetails);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', padding: '0 2rem' }}>
      {articles.length === 0 ? (
        <Typography>No articles found</Typography>
      ) : (
        <Grid container spacing={2} columns={{ xs: 4, sm: 0, md: 12 }}>
          {articles.map((article) => (
            <Grid key={article.articleId} item xs={4}>
              <Card
                style={{
                  marginBottom: '20px',
                  px: '5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                variant="outlined"
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      alignItems: 'start',
                    }}
                  >
                    <Chip
                      label={article.type}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Typography>{article.content}</Typography>
                    <Box style={{ display: 'flex', gap: '10px' }}>
                      {article.categories.map((articleCategory) => (
                        <Chip
                          key={articleCategory.categoryId}
                          label={articleCategory.category}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(article)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    disabled={edit}
                    onClick={() => onDelete(article.articleId)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Elements;
