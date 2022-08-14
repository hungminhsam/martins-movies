/* eslint-disable react/no-unescaped-entities */
import { Box, Container, Link, Divider, Grid, Stack, IconButton } from '@mui/material'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import GoogleIcon from '@mui/icons-material/Google'
import InstagramIcon from '@mui/icons-material/Instagram'
import { styled } from '@mui/material/styles'
import theme from '../../assets/theme'

const FooterLink = styled(Link)(({ theme }) => ({
	color: theme.palette.text.light,
	// marginRight: "20px",
	textDecoration: 'none',
	'&:hover': {
		color: theme.palette.primary.main
	}
}))

const Item = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.dark,
	color: theme.palette.text.light,
	...theme.typography.body2,
	padding: `0 ${theme.spacing(2)}`
}))

const ItemHeading = styled(Box)(({ theme }) => ({
	paddingBottom: '1rem',
	...theme.typography.h6
}))

const SocialIconButton = styled(IconButton)(({ theme }) => ({
	border: `1px solid ${theme.palette.grey[600]}`,
	'& > *': {
		color: theme.palette.text.light
	}
}))

export default function Footer() {
	return (
		<Box sx={{ width: '100%', bgcolor: 'background.dark' }}>
			{/* widget */}
			<Container sx={{ p: '100px 0' }}>
				<Grid container spacing={0}>
					<Grid item xs={12} sm={6} md={3}>
						<Item>
							<ItemHeading>Martin's Movies</ItemHeading>
							<Box>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque.
								Praesentium suscipit provident explicabo dignissimos nostrum numquam deserunt earum
								accusantium et fugit.
							</Box>
						</Item>
					</Grid>
					<Grid item xs={12} sm={6} md={3} mt={{ sm: 0, xs: 4 }}>
						<Item>
							<ItemHeading>Useful Links</ItemHeading>
							<Box
								sx={{
									'& > *': {
										display: 'block',
										marginBottom: 1.5
									}
								}}>
								<FooterLink href="#">About Martin's Movies</FooterLink>
								<FooterLink href="#">Blog</FooterLink>
								<FooterLink href="#">Forum</FooterLink>
								<FooterLink href="#">My Account</FooterLink>
								<FooterLink href="#">Watch List</FooterLink>
							</Box>
						</Item>
					</Grid>
					<Grid item xs={12} sm={6} md={3} mt={{ md: 0, xs: 4 }}>
						<Item>
							<ItemHeading>Latest News</ItemHeading>
							<Box
								sx={{
									'& > *': {
										marginBottom: 2,
										cursor: 'pointer',
										span: {
											color: theme.palette.grey[400],
											textTransform: 'uppercase',
											fontSize: '0.7rem'
										}
									}
								}}>
								{/* In production, this will likely be pulling data from api
                                    Hence, It will a separate component */}
								<Box>
									<FooterLink href="#">Blog Post 1</FooterLink>
									<br />
									<span>January 13, 2018</span>
								</Box>
								<Box>
									<FooterLink href="#">Blog Post 2</FooterLink>
									<br />
									<span>January 13, 2018</span>
								</Box>
								<Box>
									<FooterLink href="#">Blog Post 3</FooterLink>
									<br />
									<span>January 13, 2018</span>
								</Box>
							</Box>
						</Item>
					</Grid>
					<Grid item xs={12} sm={6} md={3} mt={{ md: 0, xs: 4 }}>
						<Item>
							<ItemHeading>Follow Us</ItemHeading>
							<Box>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque.
							</Box>
							<Box mt={4}>
								<Stack direction="row" spacing={1}>
									<SocialIconButton size="small" aria-label="facebook">
										<FacebookRoundedIcon />
									</SocialIconButton>
									<SocialIconButton size="small" aria-label="twitter">
										<TwitterIcon />
									</SocialIconButton>
									<SocialIconButton size="small" aria-label="google">
										<GoogleIcon />
									</SocialIconButton>
									<SocialIconButton size="small" aria-label="instagram">
										<InstagramIcon />
									</SocialIconButton>
								</Stack>
							</Box>
						</Item>
					</Grid>
				</Grid>
			</Container>

			<Divider sx={{ borderColor: 'grey.600' }} />

			{/* copyright */}
			<Container
				sx={{
					p: '30px 0',
					display: 'flex',
					flexDirection: { sm: 'column', md: 'row' },
					color: 'text.light'
				}}>
				<Box
					sx={{
						'& > *': {
							marginRight: 2
						}
					}}>
					<FooterLink href="#">Privacy & Cookies</FooterLink>
					<FooterLink href="#">Terms & Conditions</FooterLink>
					<FooterLink href="#">Legal Disclaimer</FooterLink>
					<FooterLink href="#">Community</FooterLink>
				</Box>

				<Box sx={{ marginLeft: 'auto' }}>
					<span>All Right Reserved by Martin's Movies</span>
				</Box>
			</Container>
		</Box>
	)
}
