import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { ContentForm } from '../Content/Content.interfaces';
import { getAllContent } from './Home.service';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  minWidth: 275,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#f0f0f0',
  },
};

const linkStyle = {
  marginTop: 'auto',
  textDecoration: 'none',
  color: '#1976D2',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    color: '#ff5722',
  },
};

const addButtonStyle = {
  marginBottom: '20px',
};

const cardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
};

function Home() {
  const [allContent, setAllContent] = useState<ContentForm[] | any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        const response = await getAllContent();
        setAllContent(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllContent();
  }, []);

  const handleAddContentClick = () => {
    navigate('/add-content');
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        style={addButtonStyle}
        onClick={handleAddContentClick}
      >
        Add Content
      </Button>
      <Grid container spacing={2}>
        {allContent.map((item: ContentForm, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={cardStyle}>
              <CardContent sx={cardContentStyle}>
                <Typography variant='h5' component='div'>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {item.description}
                </Typography>
              </CardContent>
              <div style={linkStyle}>
                <a href={item.link} target='_blank' rel='noopener noreferrer'>
                  Open Link
                </a>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
