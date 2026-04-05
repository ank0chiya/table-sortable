"use client";

import React from 'react';
import { TableRow as MUITableRow, TableCell, TextField, Select, MenuItem, Checkbox } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/react/sortable';
import { TableItemRow, CATEGORY_OPTIONS } from '@/domain/models/TableRow';

type Props = {
  row: TableItemRow;
  index: number;
  onChangeValue: <K extends keyof TableItemRow>(id: string, field: K, value: TableItemRow[K]) => void;
};

export const DraggableTableRow: React.FC<Props> = ({ row, index, onChangeValue }) => {
  const {
    ref,
    handleRef,
    isDragging,
  } = useSortable({ 
    id: row.id, 
    index,
    group: row.groupId,
    type: row.groupId,
    accept: row.groupId
  });

  return (
    <MUITableRow 
      ref={ref as any} 
      className={isDragging ? 'dragging-row' : ''}
      sx={{ 
        backgroundColor: isDragging ? '#e3f2fd' : 'inherit',
        opacity: isDragging ? 0.8 : 1,
        boxShadow: isDragging ? '0px 5px 15px rgba(0,0,0,0.1)' : 'none',
        zIndex: isDragging ? 999 : 'auto',
      }}
    >
      <TableCell padding="checkbox">
        <div
          ref={handleRef}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab', 
            display: 'inline-flex',
            padding: '8px',
            touchAction: 'none',
          }}
        >
          <DragIndicatorIcon color="action" />
        </div>
      </TableCell>
      <TableCell>
        <TextField 
          variant="outlined" 
          size="small" 
          value={row.name} 
          onChange={(e) => onChangeValue(row.id, 'name', e.target.value)} 
          fullWidth
        />
      </TableCell>
      <TableCell>
        <TextField 
          variant="outlined" 
          size="small" 
          value={row.codeName} 
          onChange={(e) => onChangeValue(row.id, 'codeName', e.target.value)} 
          fullWidth
        />
      </TableCell>
      <TableCell>
        <Select
          size="small"
          value={row.selectedOption}
          onChange={(e) => onChangeValue(row.id, 'selectedOption', e.target.value)}
          fullWidth
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox 
          checked={row.isChecked}
          onChange={(e) => onChangeValue(row.id, 'isChecked', e.target.checked)}
        />
      </TableCell>
    </MUITableRow>
  );
};
