"use client";

import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';
import { TableGroupHeader } from '@/domain/models/TableRow';

type Props = {
  header: TableGroupHeader;
};

export const TableGroupHeaderRow: React.FC<Props> = ({ header }) => {
  return (
    <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
      <TableCell colSpan={5} sx={{ py: 1.5, borderBottom: '2px solid #90caf9' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
          {header.groupName}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
