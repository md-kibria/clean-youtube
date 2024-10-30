import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export default function PaginationOutlined({data, getData}) {
  const [page, setPage] = React.useState(1);
  const handleNext = (token) => {
    getData(token);
    setPage(page+1)
  }
  
  const handlePrev = (token) => {
    getData(token);
    setPage(page-1)
  }
  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', my: 2}}>
        

        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {data.totalResults ? (
            <>
              <IconButton onClick={() => handlePrev(data.prevPageToken)} disabled={!data.prevPageToken}>
                <KeyboardArrowLeft />
              </IconButton>
              <Typography color="grey">Page {page} of {Math.ceil(data.totalResults/data.resultsPerPage)}</Typography>
              {/* <Typography color="grey">Per-page {data.resultsPerPage} of {data.totalResults}</Typography> */}
              <IconButton onClick={() => handleNext(data.nextPageToken)} disabled={!data.nextPageToken}>
                <KeyboardArrowRight />
              </IconButton>
            </>
          ): ''}
        </Box>
    </Box>
  );
}