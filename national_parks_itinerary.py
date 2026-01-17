#!/usr/bin/env python3
"""
US National Parks Itinerary Generator

Creates customized itineraries based on starting location and available days.
Considers travel distances, seasonal factors, and park highlights.
"""

import json
from datetime import datetime, timedelta
from typing import List, Dict, Tuple
import math

class NationalParksItinerary:
    def __init__(self):
        # Major US National Parks with coordinates and key info
        self.parks = {
            "Yellowstone": {
                "state": "WY/MT/ID",
                "coords": (44.4280, -110.5885),
                "min_days": 3,
                "optimal_days": 5,
                "best_months": [5, 6, 7, 8, 9],
                "highlights": ["Old Faithful", "Grand Prismatic", "Wildlife viewing", "Grand Canyon of Yellowstone"],
                "nearby_parks": ["Grand Teton", "Glacier"]
            },
            "Grand Teton": {
                "state": "WY",
                "coords": (43.7904, -110.6818),
                "min_days": 2,
                "optimal_days": 3,
                "best_months": [6, 7, 8, 9],
                "highlights": ["Teton Range", "Jenny Lake", "Snake River", "Wildlife"],
                "nearby_parks": ["Yellowstone"]
            },
            "Glacier": {
                "state": "MT",
                "coords": (48.7596, -113.7870),
                "min_days": 3,
                "optimal_days": 4,
                "best_months": [7, 8, 9],
                "highlights": ["Going-to-the-Sun Road", "Lake McDonald", "Many Glacier", "Hiking trails"],
                "nearby_parks": ["Yellowstone"]
            },
            "Yosemite": {
                "state": "CA",
                "coords": (37.8651, -119.5383),
                "min_days": 3,
                "optimal_days": 5,
                "best_months": [4, 5, 6, 9, 10],
                "highlights": ["Half Dome", "El Capitan", "Yosemite Falls", "Mariposa Grove"],
                "nearby_parks": ["Sequoia", "Kings Canyon", "Death Valley"]
            },
            "Sequoia": {
                "state": "CA",
                "coords": (36.4864, -118.5658),
                "min_days": 2,
                "optimal_days": 3,
                "best_months": [5, 6, 7, 8, 9, 10],
                "highlights": ["General Sherman Tree", "Giant Forest", "Moro Rock", "Crystal Cave"],
                "nearby_parks": ["Kings Canyon", "Yosemite"]
            },
            "Kings Canyon": {
                "state": "CA",
                "coords": (36.8879, -118.5551),
                "min_days": 2,
                "optimal_days": 3,
                "best_months": [5, 6, 7, 8, 9, 10],
                "highlights": ["Kings Canyon Scenic Byway", "Cedar Grove", "Grant Grove", "Zumwalt Meadows"],
                "nearby_parks": ["Sequoia", "Yosemite"]
            },
            "Death Valley": {
                "state": "CA/NV",
                "coords": (36.2424, -116.8900),
                "min_days": 2,
                "optimal_days": 3,
                "best_months": [11, 12, 1, 2, 3, 4],
                "highlights": ["Badwater Basin", "Artist's Palette", "Zabriskie Point", "Mesquite Flat Sand Dunes"],
                "nearby_parks": ["Joshua Tree", "Yosemite"]
            },
            "Joshua Tree": {
                "state": "CA",
                "coords": (33.8734, -115.9010),
                "min_days": 2,
                "optimal_days": 3,
                "best_months": [10, 11, 12, 1, 2, 3, 4],
                "highlights": ["Joshua Tree Forest", "Skull Rock", "Keys View", "Rock formations"],
                "nearby_parks": ["Death Valley"]
            },
            "Grand Canyon": {
                "state": "AZ",
                "coords": (36.1069, -112.1129),
                "min_days": 2,
                "optimal_days": 4,
                "best_months": [3, 4, 5, 9, 10, 11],
                "highlights": ["South Rim", "North Rim", "Desert View", "Bright Angel Trail"],
                "nearby_parks": ["Zion", "Bryce Canyon"]
            },
            "Zion": {
                "state": "UT",
                "coords": (37.2982, -113.0263),
                "min_days": 2,
                "optimal_days": 4,
                "best_months": [3, 4, 5, 9, 10, 11],
                "highlights": ["Angels Landing", "The Narrows", "Emerald Pools", "Canyon Junction Bridge"],
                "nearby_parks": ["Bryce Canyon", "Grand Canyon"]
            },
            "Bryce Canyon": {
                "state": "UT",
                "coords": (37.5930, -112.1871),
                "min_days": 1,
                "optimal_days": 2,
                "best_months": [4, 5, 6, 9, 10],
                "highlights": ["Bryce Amphitheater", "Sunrise Point", "Sunset Point", "Navajo Loop Trail"],
                "nearby_parks": ["Zion", "Grand Canyon"]
            },
            "Arches": {
                "state": "UT",
                "coords": (38.7331, -109.5925),
                "min_days": 1,
                "optimal_days": 2,
                "best_months": [3, 4, 5, 9, 10, 11],
                "highlights": ["Delicate Arch", "Landscape Arch", "Fiery Furnace", "Courthouse Towers"],
                "nearby_parks": ["Canyonlands"]
            },
            "Canyonlands": {
                "state": "UT",
                "coords": (38.2619, -109.9275),
                "min_days": 2,
                "optimal_days": 3,
                "best_months": [3, 4, 5, 9, 10, 11],
                "highlights": ["Mesa Arch", "Grand View Point", "Island in the Sky", "The Needles"],
                "nearby_parks": ["Arches"]
            },
            "Rocky Mountain": {
                "state": "CO",
                "coords": (40.3428, -105.6836),
                "min_days": 2,
                "optimal_days": 4,
                "best_months": [6, 7, 8, 9],
                "highlights": ["Trail Ridge Road", "Bear Lake", "Sprague Lake", "Alberta Falls"],
                "nearby_parks": ["Great Sand Dunes"]
            },
            "Great Sand Dunes": {
                "state": "CO",
                "coords": (37.7916, -105.5943),
                "min_days": 1,
                "optimal_days": 2,
                "best_months": [4, 5, 6, 9, 10],
                "highlights": ["Star Dune", "High Dune", "Medano Creek", "Sand sledding"],
                "nearby_parks": ["Rocky Mountain"]
            },
            "Great Smoky Mountains": {
                "state": "TN/NC",
                "coords": (35.6118, -83.4895),
                "min_days": 2,
                "optimal_days": 4,
                "best_months": [4, 5, 6, 9, 10],
                "highlights": ["Cades Cove", "Cataract Falls", "Chimney Tops", "Appalachian Trail"],
                "nearby_parks": ["Mammoth Cave"]
            },
            "Mammoth Cave": {
                "state": "KY",
                "coords": (37.1862, -86.1004),
                "min_days": 1,
                "optimal_days": 2,
                "best_months": [4, 5, 6, 7, 8, 9, 10],
                "highlights": ["Cave tours", "Green River", "Historic Tour", "Wild Cave Tour"],
                "nearby_parks": ["Great Smoky Mountains"]
            },
            "Acadia": {
                "state": "ME",
                "coords": (44.3386, -68.2733),
                "min_days": 2,
                "optimal_days": 3,
                "best_months": [6, 7, 8, 9, 10],
                "highlights": ["Cadillac Mountain", "Jordan Pond", "Thunder Hole", "Bar Harbor"],
                "nearby_parks": []
            },
            "Everglades": {
                "state": "FL",
                "coords": (25.2866, -80.8987),
                "min_days": 2,
                "optimal_days": 3,
                "best_months": [12, 1, 2, 3, 4],
                "highlights": ["Anhinga Trail", "Flamingo", "Shark Valley", "Manatee viewing"],
                "nearby_parks": []
            }
        }
        
        # Major US cities as potential starting points
        self.cities = {
            "New York": (40.7128, -74.0060),
            "Los Angeles": (34.0522, -118.2437),
            "Chicago": (41.8781, -87.6298),
            "Houston": (29.7604, -95.3698),
            "Phoenix": (33.4484, -112.0740),
            "Philadelphia": (39.9526, -75.1652),
            "San Antonio": (29.4241, -98.4936),
            "San Diego": (32.7157, -117.1611),
            "Dallas": (32.7767, -96.7970),
            "San Jose": (37.3382, -121.8863),
            "Austin": (30.2672, -97.7431),
            "Jacksonville": (30.3322, -81.6557),
            "Fort Worth": (32.7555, -97.3308),
            "Columbus": (39.9612, -82.9988),
            "Charlotte": (35.2271, -80.8431),
            "San Francisco": (37.7749, -122.4194),
            "Indianapolis": (39.7684, -86.1581),
            "Seattle": (47.6062, -122.3321),
            "Denver": (39.7392, -104.9903),
            "Boston": (42.3601, -71.0589),
            "Nashville": (36.1627, -86.7816),
            "Detroit": (42.3314, -83.0458),
            "Portland": (45.5152, -122.6784),
            "Las Vegas": (36.1699, -115.1398),
            "Miami": (25.7617, -80.1918),
            "Atlanta": (33.7490, -84.3880),
            "Salt Lake City": (40.7608, -111.8910)
        }

    def calculate_distance(self, coord1: Tuple[float, float], coord2: Tuple[float, float]) -> float:
        """Calculate distance between two coordinates in miles using Haversine formula"""
        lat1, lon1 = coord1
        lat2, lon2 = coord2
        
        # Convert to radians
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
        
        # Haversine formula
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        r = 3956  # Radius of earth in miles
        
        return c * r

    def get_starting_coordinates(self, location: str) -> Tuple[float, float]:
        """Get coordinates for starting location"""
        # Check if it's a known city
        if location in self.cities:
            return self.cities[location]
        
        # Check if it's a national park
        for park_name, park_info in self.parks.items():
            if location.lower() in park_name.lower():
                return park_info["coords"]
        
        # If not found, return Denver as default (central US)
        print(f"Location '{location}' not found. Using Denver, CO as default starting point.")
        return self.cities["Denver"]

    def find_nearby_parks(self, start_coords: Tuple[float, float], max_distance: float = 500) -> List[Tuple[str, float]]:
        """Find parks within max_distance miles of starting point"""
        nearby = []
        
        for park_name, park_info in self.parks.items():
            distance = self.calculate_distance(start_coords, park_info["coords"])
            if distance <= max_distance:
                nearby.append((park_name, distance))
        
        # Sort by distance
        nearby.sort(key=lambda x: x[1])
        return nearby

    def is_good_season(self, park_name: str, month: int) -> bool:
        """Check if current month is good for visiting the park"""
        return month in self.parks[park_name]["best_months"]

    def generate_itinerary(self, starting_location: str, total_days: int, start_month: int = None) -> Dict:
        """Generate an itinerary based on starting location and available days"""
        if start_month is None:
            start_month = datetime.now().month
        
        start_coords = self.get_starting_coordinates(starting_location)
        
        # Find parks within reasonable driving distance
        nearby_parks = self.find_nearby_parks(start_coords, max_distance=800)
        
        if not nearby_parks:
            return {"error": "No parks found within reasonable distance"}
        
        # Filter parks by season and sort by priority
        seasonal_parks = []
        for park_name, distance in nearby_parks:
            park_info = self.parks[park_name]
            is_seasonal = self.is_good_season(park_name, start_month)
            
            seasonal_parks.append({
                "name": park_name,
                "distance": distance,
                "min_days": park_info["min_days"],
                "optimal_days": park_info["optimal_days"],
                "seasonal_fit": is_seasonal,
                "highlights": park_info["highlights"],
                "state": park_info["state"]
            })
        
        # Sort by seasonal fit first, then by distance
        seasonal_parks.sort(key=lambda x: (not x["seasonal_fit"], x["distance"]))
        
        # Build itinerary
        itinerary = {
            "starting_location": starting_location,
            "total_days": total_days,
            "month": start_month,
            "parks": [],
            "total_driving_miles": 0,
            "recommendations": []
        }
        
        remaining_days = total_days
        current_location = start_coords
        
        for park in seasonal_parks:
            if remaining_days <= 0:
                break
            
            # Determine days to spend at this park
            if remaining_days >= park["optimal_days"]:
                days_at_park = park["optimal_days"]
            elif remaining_days >= park["min_days"]:
                days_at_park = park["min_days"]
            else:
                continue  # Skip if not enough days
            
            # Calculate driving distance from current location
            park_coords = self.parks[park["name"]]["coords"]
            driving_distance = self.calculate_distance(current_location, park_coords)
            
            itinerary["parks"].append({
                "name": park["name"],
                "state": park["state"],
                "days": days_at_park,
                "driving_miles_from_previous": round(driving_distance, 1),
                "seasonal_fit": park["seasonal_fit"],
                "highlights": park["highlights"][:3]  # Top 3 highlights
            })
            
            itinerary["total_driving_miles"] += driving_distance
            remaining_days -= days_at_park
            current_location = park_coords
        
        # Add recommendations
        if remaining_days > 0:
            itinerary["recommendations"].append(f"You have {remaining_days} extra days - consider extending stays at your favorite parks")
        
        if not any(park["seasonal_fit"] for park in itinerary["parks"]):
            itinerary["recommendations"].append(f"Note: {start_month}/12 might not be optimal season for these parks. Consider spring/summer/fall visits.")
        
        itinerary["total_driving_miles"] = round(itinerary["total_driving_miles"], 1)
        
        return itinerary

    def print_itinerary(self, itinerary: Dict):
        """Print a formatted itinerary"""
        if "error" in itinerary:
            print(f"Error: {itinerary['error']}")
            return
        
        print(f"\n🏞️  NATIONAL PARKS ITINERARY")
        print(f"{'='*50}")
        print(f"Starting from: {itinerary['starting_location']}")
        print(f"Total days: {itinerary['total_days']}")
        print(f"Month: {itinerary['month']}")
        print(f"Total driving: {itinerary['total_driving_miles']} miles")
        print()
        
        for i, park in enumerate(itinerary['parks'], 1):
            seasonal_indicator = "🌟" if park['seasonal_fit'] else "❄️"
            print(f"{i}. {park['name']} ({park['state']}) {seasonal_indicator}")
            print(f"   Days: {park['days']}")
            print(f"   Drive: {park['driving_miles_from_previous']} miles")
            print(f"   Highlights: {', '.join(park['highlights'])}")
            print()
        
        if itinerary['recommendations']:
            print("💡 RECOMMENDATIONS:")
            for rec in itinerary['recommendations']:
                print(f"   • {rec}")
            print()

def main():
    """Interactive itinerary generator"""
    generator = NationalParksItinerary()
    
    print("🏞️  Welcome to the US National Parks Itinerary Generator!")
    print("I'll help you plan your national parks adventure.\n")
    
    # Get user input
    starting_location = input("Where are you starting from? (city name or 'current location'): ").strip()
    if not starting_location:
        starting_location = "Denver"
    
    try:
        total_days = int(input("How many days do you have for this trip? "))
    except ValueError:
        total_days = 7
        print("Using default: 7 days")
    
    try:
        month = int(input("What month are you traveling? (1-12, or press Enter for current month): ") or datetime.now().month)
        if month < 1 or month > 12:
            month = datetime.now().month
    except ValueError:
        month = datetime.now().month
    
    # Generate and display itinerary
    itinerary = generator.generate_itinerary(starting_location, total_days, month)
    generator.print_itinerary(itinerary)
    
    # Save to file option
    save = input("\nWould you like to save this itinerary to a file? (y/n): ").lower().strip()
    if save.startswith('y'):
        filename = f"itinerary_{starting_location.replace(' ', '_')}_{total_days}days.json"
        with open(filename, 'w') as f:
            json.dump(itinerary, f, indent=2)
        print(f"Itinerary saved to {filename}")

if __name__ == "__main__":
    main()