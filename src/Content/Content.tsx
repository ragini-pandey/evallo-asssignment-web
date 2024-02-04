import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { ContentForm } from './Content.interfaces';
import { createContent } from './Content.service';

const Content: React.FC = () => {
  const [content, setContent] = useState<ContentForm>({
    title: '',
    description: '',
    link: '',
  });

  const [errors, setErrors] = useState<{
    title: string | null;
    description: string | null;
    link: string | null;
  }>({
    title: null,
    description: null,
    link: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'title') {
      validateTitle(e.target.value);
    } else if (e.target.name === 'description') {
      validateDescription(e.target.value);
    } else if (e.target.name === 'link') {
      validateLink(e.target.value);
    }
  };

  const validateTitle = (value: string) => {
    let error = null;

    if (!value.trim()) {
      error = 'Title is required';
    } else if (value.length > 100) {
      error = 'Title must not exceed 100 characters';
    }

    setErrors({
      ...errors,
      title: error,
    });
  };

  const validateDescription = (value: string) => {
    let error = null;

    setErrors({
      ...errors,
      description: error,
    });
  };

  const validateLink = (value: string) => {
    let error = null;

    if (!value.trim()) {
      error = 'Link is required';
    } else {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(value)) {
        error = 'Invalid URL';
      }
    }

    setErrors({
      ...errors,
      link: error,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateTitle(content.title);
    validateDescription(content.description);
    validateLink(content.link);

    if (!errors.title && !errors.description && !errors.link) {
      try {
        const data = await createContent(content);
        console.log('API response:', data);
      } catch (error) {
        console.error('Error during API call:', error);
      }
    }
  };

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        Add Content
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Title'
              fullWidth
              margin='normal'
              name='title'
              value={content.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Description'
              fullWidth
              margin='normal'
              name='description'
              value={content.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Link'
              fullWidth
              margin='normal'
              name='link'
              value={content.link}
              onChange={handleChange}
              error={!!errors.link}
              helperText={errors.link}
            />
          </Grid>
        </Grid>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Content;
