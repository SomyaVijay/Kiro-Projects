# US National Parks Itinerary Generator

A Python tool to create customized national parks itineraries based on your starting location and available time.

## Features

- **Smart Location-Based Planning**: Finds parks within reasonable driving distance from your starting point
- **Seasonal Optimization**: Recommends the best times to visit each park
- **Flexible Duration**: Adapts to your available days (1-30+ days)
- **Distance Calculations**: Shows driving distances between locations
- **Comprehensive Park Database**: Covers 18+ major US national parks
- **Highlight Recommendations**: Shows must-see attractions at each park

## Quick Start

```bash
python national_parks_itinerary.py
```

The interactive program will ask for:
- Starting location (any major US city or national park)
- Number of days available
- Travel month (for seasonal recommendations)

## Example Usage

**Starting from Denver, 10 days in July:**
```
🏞️  NATIONAL PARKS ITINERARY
==================================================
Starting from: Denver
Total days: 10
Month: 7
Total driving: 847.3 miles

1. Rocky Mountain (CO) 🌟
   Days: 4
   Drive: 65.8 miles
   Highlights: Trail Ridge Road, Bear Lake, Sprague Lake

2. Great Sand Dunes (CO) 🌟
   Days: 2
   Drive: 168.9 miles
   Highlights: Star Dune, High Dune, Medano Creek

3. Arches (UT) 🌟
   Days: 2
   Drive: 347.8 miles
   Highlights: Delicate Arch, Landscape Arch, Fiery Furnace

4. Canyonlands (UT) 🌟
   Days: 2
   Drive: 26.4 miles
   Highlights: Mesa Arch, Grand View Point, Island in the Sky
```

## Supported Starting Locations

### Major Cities
- New York, Los Angeles, Chicago, Houston, Phoenix
- San Francisco, Seattle, Denver, Boston, Miami
- Las Vegas, Salt Lake City, Portland, Nashville
- And 15+ more major US cities

### National Parks
You can also start from any of the supported national parks:
- Yellowstone, Yosemite, Grand Canyon, Zion
- Glacier, Great Smoky Mountains, Acadia
- Rocky Mountain, Arches, Bryce Canyon
- And 10+ more parks

## Park Database

The tool includes detailed information for 18 major national parks:

| Park | State | Best Months | Min Days | Optimal Days |
|------|-------|-------------|----------|--------------|
| Yellowstone | WY/MT/ID | May-Sep | 3 | 5 |
| Yosemite | CA | Apr-Jun, Sep-Oct | 3 | 5 |
| Grand Canyon | AZ | Mar-May, Sep-Nov | 2 | 4 |
| Zion | UT | Mar-May, Sep-Nov | 2 | 4 |
| Glacier | MT | Jul-Sep | 3 | 4 |
| Great Smoky Mountains | TN/NC | Apr-Jun, Sep-Oct | 2 | 4 |

## Seasonal Recommendations

The tool considers optimal visiting seasons:
- **🌟 Seasonal Fit**: Park is in its best season
- **❄️ Off-Season**: Park is visitable but not optimal

### Best Times by Region:
- **Western Mountain Parks** (Yellowstone, Glacier, Rocky Mountain): June-September
- **Desert Parks** (Death Valley, Joshua Tree): October-April  
- **California Parks** (Yosemite, Sequoia): April-June, September-October
- **Utah Parks** (Zion, Bryce, Arches): March-May, September-November

## Customization

You can modify the `national_parks_itinerary.py` file to:
- Add more parks to the database
- Adjust optimal visiting seasons
- Change distance calculations
- Add new starting cities
- Modify park highlights and recommendations

## Tips for Multi-Year Planning

1. **Regional Clusters**: Plan trips around park clusters (Utah Big 5, California Sierra, etc.)
2. **Seasonal Strategy**: Visit mountain parks in summer, desert parks in winter
3. **Gateway Cities**: Use cities like Denver, Salt Lake City, or Las Vegas as bases
4. **Flexible Dates**: Shoulder seasons often offer better weather and fewer crowds

## Output Options

- **Console Display**: Interactive formatted output
- **JSON Export**: Save itineraries for future reference
- **Customizable**: Easy to modify for different output formats

Start planning your national parks adventure today! 🏞️