import { useState } from 'react'
import { AppBar, Box, Toolbar, Button, IconButton, Container, Typography } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import Badge from '@mui/material/Badge'
import PublicIcon from '@mui/icons-material/Public'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '../../assets/logo.svg'
import pageHeaderBg from '../../assets/movie-collection.jpg'
import SearchBar from '../ui/SearchBar'
import NavBarMenu from '../ui/NavBarMenu'
import AppDrawer from '../ui/AppDrawer'

const menus = {
	home: [
		{ name: 'Home Version 1', href: '#' },
		{ name: 'Home Version 2', href: '#' },
		{ name: 'Home Version 3', href: '#' },
		{ name: 'Home Version 4', href: '#' }
	],
	pages: [
		{ name: '404 Page', href: '#' },
		{ name: 'Celebrities List', href: '#' },
		{ name: 'Celebrities Grid', href: '#' },
		{ name: 'Celebrities Details', href: '#' },
		{ name: 'Contact Us', href: '#' },
		{ name: 'Coming Soon', href: '#' },
		{ name: 'Pricing Plan', href: '#' },
		{ name: 'Login - Register', href: '#' },
		{ name: 'Testimonials', href: '#' }
	],
	moviesAndTV: [
		{ name: 'Movie List 1', href: '#' },
		{ name: 'Movie List 2', href: '#' },
		{ name: 'Movie Grid 1', href: '#' },
		{ name: 'Movie Grid 2', href: '#' },
		{ name: 'Movie Grid 3', href: '#' },
		{ name: 'Movie Grid 4', href: '#' },
		{ name: 'Movie Detail', href: '#' },
		{ name: 'Movie Detail 2', href: '#' },
		{ name: 'Watch Later', href: '#' }
	],
	blogs: [
		{ name: 'Blog List', href: '#' },
		{ name: 'Blog List Fullwidth', href: '#' },
		{ name: 'Blog Detail', href: '#' },
		{ name: 'Blog Detail Fullwidth', href: '#' }
	]
}

export default function Header(props) {
	const [showSearchBar, setShowSearchBar] = useState(false)
	const [showDrawer, setShowDrawer] = useState(false)

	return (
		<>
			{showSearchBar && <SearchBar onClose={() => setShowSearchBar(false)} />}
			<AppDrawer open={showDrawer} onClose={() => setShowDrawer(false)} />
			<AppBar
				position="static"
				color="background"
				sx={{
					width: '100%',
					boxShadow: 0,
					margin: 0,
					padding: 0,
					height: '70px',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<Toolbar
					id="back-to-top-anchor"
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					{/* Logo */}
					<Box>
						<img src={logo} alt="company logo" width={150} />
					</Box>
					{/* Hamberger Menu */}
					<Box
						sx={{
							marginLeft: 'auto',
							display: { md: 'flex', lg: 'none' }
						}}>
						<IconButton onClick={() => setShowDrawer(true)}>
							<MenuIcon fontSize="large" />
						</IconButton>
					</Box>
					{/* Main NavBar */}
					<Box
						sx={{
							width: '100%',
							display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }
						}}>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<NavBarMenu name="Home" items={menus.home} />
							<NavBarMenu name="Pages" items={menus.pages} />
							<NavBarMenu name="Movies & TV Shows" items={menus.moviesAndTV} />
							<NavBarMenu name="Blogs" items={menus.blogs} />
							<Button variant="text">Contact Us</Button>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<IconButton aria-label="delete" onClick={() => setShowSearchBar(true)}>
								<SearchIcon />
							</IconButton>
							<IconButton
								sx={{ marginLeft: '30px' }}
								onClick={() => {
									/* navigate to the notification page */
								}}>
								<Badge badgeContent={2} color="error">
									<PublicIcon />
								</Badge>
							</IconButton>
							<Button
								sx={{ marginLeft: '30px' }}
								variant="contained"
								startIcon={<PersonOutlineIcon />}
								onClick={() => {
									/* navigate to the login page */
								}}>
								Login
							</Button>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
			{/* Page Heading */}
			<Box
				sx={{
					width: '100%',
					padding: '50px 0',
					margin: 0,
					background: `url(${pageHeaderBg})`,
					position: 'relative',
					zIndex: 10,
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						bgcolor: 'common.black',
						opacity: 0.8,
						zIndex: 20
					},
					'&::after': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						bgcolor: 'primary.main',
						opacity: 0.5,
						zIndex: 20
					}
				}}>
				<Container
					sx={{
						position: 'relative',
						zIndex: 30
					}}>
					<Typography variant="h3" color="common.white">
						Movie Grid 3
					</Typography>
					<Typography variant="subtitle1" color="common.white">
						Home | Movie Grid 3
					</Typography>
				</Container>
			</Box>
		</>
	)
}
