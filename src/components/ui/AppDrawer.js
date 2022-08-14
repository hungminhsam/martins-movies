import Drawer from '@mui/material/Drawer'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { styled, Typography } from '@mui/material'

const DrawerDivider = styled(Divider)(({ theme }) => ({
	borderColor: theme.palette.grey[600]
}))

export default function AppDrawer(props) {
	return (
		<Drawer
			{...props}
			anchor="right"
			sx={{
				width: '250px',
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: { xs: '280px', sm: '380px', md: '440px' },
					// Technical Debt
					// need to use the color from the theme setting instead of hardcoding
					background: '#2A2A2A',
					color: '#FFFFFF'
				}
			}}>
			<List
				sx={{ width: '100%', bgcolor: 'transparent' }}
				component="nav"
				subheader={
					<ListSubheader
						component="div"
						sx={{
							bgcolor: 'transparent',
							color: 'inherit',
							padding: 1,
							textAlign: 'center'
						}}>
						<Typography variant="h6">MENU</Typography>
					</ListSubheader>
				}>
				<DrawerDivider />
				<ListItemButton>
					<ListItemText primary="Home" />
				</ListItemButton>
				<DrawerDivider />
				<ListItemButton>
					<ListItemText primary="Pages" />
				</ListItemButton>
				<DrawerDivider />
				<ListItemButton>
					<ListItemText primary="Movies & TV Shows" />
				</ListItemButton>
				<DrawerDivider />
				<ListItemButton>
					<ListItemText primary="Blogs" />
				</ListItemButton>
				<DrawerDivider />
				<ListItemButton>
					<ListItemText primary="Contact Us" />
				</ListItemButton>
			</List>
		</Drawer>
	)
}
