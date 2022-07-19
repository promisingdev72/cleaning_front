import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
import useAuth from '../../../hooks/useAuth';
//
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  })
);

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }) {
  const { translate } = useLocales();
  const { user } = useAuth();

  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {translate(group.subheader)}
          </ListSubheaderStyle>

          {group.items.map((list) => {
            if (user.roleId === 'ADMIN') {
              if (
                list.title === 'Tasks' ||
                list.title === 'Employees' ||
                list.title === 'Customers' ||
                list.title === 'SMS'
              )
                return <NavListRoot key={list.title + list.path} list={list} isCollapse={isCollapse} />;
            } else if (user.roleId === 'CUSTOMER') {
              if (list.title === 'Manage Bus List' || list.title === 'Manage Driver List' || list.title === 'Tasks')
                return <NavListRoot key={list.title + list.path} list={list} isCollapse={isCollapse} />;
            } else if (user.roleId === 'EMPLOYEE') {
              if (list.title === 'Tasks')
                return <NavListRoot key={list.title + list.path} list={list} isCollapse={isCollapse} />;
            }
            return null;
          })}
        </List>
      ))}
    </Box>
  );
}

// {user.roleId === "ADMIN" && (
//   {list.title !== "Manage Bus List" && <NavListRoot key={list.title + list.path} list={list} isCollapse={isCollapse} />}
// )}
