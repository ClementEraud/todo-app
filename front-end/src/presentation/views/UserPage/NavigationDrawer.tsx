import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TaskIcon from '@mui/icons-material/Task';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

export const NavigationDrawer = () => {
	const location = useLocation();
	const navigation = useNavigate();
	const { t } = useTranslation('navigationDrawer');

	const navigationList = [
		{
			key: 'MealPlanner',
			link: '/user-page',
			icon: <RestaurantIcon />,
			tooltip: t('tooltips.mealPlanner'),
		},
		{
			key: 'Tasks',
			link: '/user-page/tasks',
			icon: <TaskIcon />,
			tooltip: t('tooltips.tasks'),
		},
	];

	const iconStyle = {
		paddingLeft: 2,
	};

	return (
		<List sx={{ width: '100%', maxWidth: 360 }}>
			{navigationList.map(item => (
				<ListItem disablePadding key={item.key}>
					<Tooltip title={item.tooltip} placement="right">
						<ListItemButton
							selected={location.pathname === item.link}
							onClick={() => navigation(item.link)}>
							<ListItemIcon sx={iconStyle}>{item.icon}</ListItemIcon>
						</ListItemButton>
					</Tooltip>
				</ListItem>
			))}
		</List>
	);
};
