import PropTypes from 'prop-types';
// @mui
import { Checkbox, TableRow, TableCell } from '@mui/material';

// ----------------------------------------------------------------------

SmsTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

export default function SmsTableRow({ row, selected, onSelectRow }) {
  const { name, phoneNumber, roleId } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>{name}</TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>{phoneNumber}</TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>{roleId}</TableCell>
    </TableRow>
  );
}
