"use client";

import React from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow as MUITableRow, Paper, TablePagination } from '@mui/material';

import { TableNode, TableItemRow } from '@/domain/models/TableRow';
import { DraggableTableRow } from './DraggableTableRow';
import { TableGroupHeaderRow } from './TableGroupHeaderRow';

export type DragEndEvent = Parameters<NonNullable<React.ComponentProps<typeof DragDropProvider>['onDragEnd']>>[0];

type Props = {
  rows: TableNode[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onChangeValue: <K extends keyof TableItemRow>(id: string, field: K, value: TableItemRow[K]) => void;
};

export const DraggableTable: React.FC<Props> = ({ 
  rows, totalCount, page, rowsPerPage, 
  onChangePage, onChangeRowsPerPage, 
  onDragEnd, onChangeValue 
}) => {
  let sortableIndex = 0;

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="draggable form table">
          <TableHead sx={{ backgroundColor: 'action.hover' }}>
            <MUITableRow>
              <TableCell width={50}></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Code Name</strong></TableCell>
              <TableCell width={200}><strong>Category</strong></TableCell>
              <TableCell width={80} align="center"><strong>Active</strong></TableCell>
            </MUITableRow>
          </TableHead>
          <TableBody>
            {rows.map((node) => {
              if (node.isHeader) {
                return <TableGroupHeaderRow key={node.id} header={node} />;
              }
              const currentIndex = sortableIndex++;
              return (
                <DraggableTableRow 
                  key={node.id} 
                  row={node} 
                  index={currentIndex}
                  onChangeValue={onChangeValue} 
                />
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </TableContainer>
    </DragDropProvider>
  );
};
