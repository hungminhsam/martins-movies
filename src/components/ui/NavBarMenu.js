/* eslint-disable react/prop-types */
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'

export default function NavBarMenu({ name, items }) {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleMenuItemClick = (event, index) => {
		handleClose()
		// navigate to the menu item's href
		console.log(items[index].href)
	}

	return (
		<div>
			<Button
				id={`navbar-menu-button-${name}`}
				aria-controls={open ? `navbar-menu-${name}` : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				endIcon={<ExpandMoreIcon />}>
				{name}
			</Button>
			<Menu
				id={`navbar-menu-${name}`}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': `navbar-menu-button-${name}`
				}}>
				{items.map((item, index) => (
					<MenuItem
						sx={{ width: '200px' }}
						onClick={event => handleMenuItemClick(event, index)}
						key={item.name + '-' + index}>
						{item.name}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}
