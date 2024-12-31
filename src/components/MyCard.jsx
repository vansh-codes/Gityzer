import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

function MyCard({ login, img, url, contributions }) {
  return (
    <Card
      sx={{
        minWidth: '90%',
        textAlign: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
        border: '1px solid white',
        color: 'white',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        '&:hover': {
          backgroundColor: 'black',
          opacity: '0.8',
          border: '1px solid green',
          transform: 'scale(1.05)',
        },
      }}
    >
      <a href={url}>
        <CardMedia
          component='img'
          height='140'
          image={img}
          alt={`${login} avatar`}
          sx={{ width: 70, height: 70, borderRadius: '50%', margin: 'auto', mt: 2 }}
        />
        <CardContent>
          <Typography variant='h7'>{login}</Typography>
          <Typography sx={{ mt: 1 }}>{contributions} Contributions </Typography>
        </CardContent>
      </a>
    </Card>
  )
}

export default MyCard
