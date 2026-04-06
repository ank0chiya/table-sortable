"use client";

import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { DraggableTable } from "@/presentation/components/DraggableTable";
import { useTableForm } from "@/application/hooks/useTableForm";
import React from "react";

// 簡単なカスタムテーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function Home() {
  const { 
    rows, 
    paginatedRows, 
    page, 
    rowsPerPage, 
    handleDragStart,
    handleDragOver,
    handleDragEnd, 
    handleChangeValue,
    handleChangePage,
    handleChangeRowsPerPage
  } = useTableForm();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            ドラッグ＆ドロップ対応 テーブルフォーム
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            行の左端にあるハンドルを掴むことで、レコードの順序を入れ替えることができます。
            また、名前やコード名などの各種値コンポーネントの値も連動して保存されます。
          </Typography>
          <DraggableTable 
            rows={paginatedRows} 
            totalCount={rows.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd} 
            onChangeValue={handleChangeValue} 
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
