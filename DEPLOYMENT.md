# Deployment Guide for GitHub Pages

This guide will help you deploy your National Parks Itinerary Generator to GitHub Pages.

## Quick Setup

1. **Create a new GitHub repository**
   - Go to GitHub and create a new repository
   - Name it something like `national-parks-itinerary`
   - Make it public (required for free GitHub Pages)

2. **Upload your files**
   - Upload all the files from this directory to your repository
   - Make sure to include:
     - `index.html` (main page)
     - `app.js` (JavaScript functionality)
     - `README.md` (documentation)
     - `_config.yml` (Jekyll configuration)
     - `.github/workflows/pages.yml` (GitHub Actions workflow)

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy your site

4. **Update URLs**
   - Edit `_config.yml` and replace `yourusername` with your GitHub username
   - Edit `README.md` and update the live demo URL
   - Edit `index.html` meta tags and update the og:url property

## Your site will be available at:
`https://yourusername.github.io/national-parks-itinerary/`

## Features Included

✅ **Fully Static**: No server required, works entirely in the browser
✅ **Mobile Responsive**: Works on all devices
✅ **SEO Optimized**: Includes meta tags and structured data
✅ **Fast Loading**: Optimized images and minimal dependencies
✅ **Shareable Links**: Generate URLs to share itineraries
✅ **Interactive Maps**: Google Maps integration for routes

## Customization

### Adding More Parks
Edit the `parks` object in `app.js` to add more national parks with:
- Coordinates
- Best visiting months
- Temperature data
- Hiking trails
- Highlights

### Styling Changes
All CSS is embedded in `index.html` for easy customization.

### Adding Cities
Edit the `cities` object in `app.js` to add more starting locations.

## Troubleshooting

**Site not loading?**
- Check that GitHub Pages is enabled in repository settings
- Ensure all files are in the root directory
- Wait a few minutes for deployment to complete

**JavaScript errors?**
- Check browser console for error messages
- Ensure `app.js` is properly linked in `index.html`

**Styling issues?**
- All CSS is in `index.html` - check for syntax errors
- Test locally by opening `index.html` in your browser

## Performance Tips

- Images are loaded from Unsplash CDN for fast loading
- JavaScript is vanilla (no frameworks) for minimal size
- CSS uses modern features for better performance

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all files are uploaded correctly
3. Test locally first by opening `index.html`
4. Check GitHub Actions tab for deployment status