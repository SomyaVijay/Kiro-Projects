// National Parks Database
const parks = {
    "Olympic": {
        state: "WA",
        coords: [47.8021, -123.6044],
        minDays: 3,
        optimalDays: 5,
        bestMonths: [6, 7, 8, 9],
        highlights: ["Hoh Rainforest", "Hurricane Ridge", "Sol Duc Hot Springs", "Ruby Beach"],
        nearbyParks: ["Mount Rainier", "North Cascades", "Mount St. Helens"],
        avgTemps: {
            1: { high: 46, low: 35 }, 2: { high: 50, low: 36 }, 3: { high: 54, low: 39 },
            4: { high: 59, low: 42 }, 5: { high: 65, low: 47 }, 6: { high: 70, low: 52 },
            7: { high: 75, low: 55 }, 8: { high: 75, low: 55 }, 9: { high: 70, low: 51 },
            10: { high: 61, low: 45 }, 11: { high: 52, low: 39 }, 12: { high: 47, low: 36 }
        },
        hikes: [
            {
                name: "Hoh River Trail",
                distance: 3.4,
                elevation: 200,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: false,
                description: "Temperate rainforest trail"
            },
            {
                name: "Hurricane Ridge",
                distance: 1.6,
                elevation: 300,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: true,
                description: "Mountain views and wildflowers"
            },
            {
                name: "Sol Duc Falls",
                distance: 1.6,
                elevation: 200,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: false,
                description: "Beautiful waterfall hike"
            }
        ]
    },
    "Mount Rainier": {
        state: "WA",
        coords: [46.8523, -121.7603],
        minDays: 2,
        optimalDays: 4,
        bestMonths: [7, 8, 9],
        highlights: ["Paradise", "Sunrise", "Mount Rainier Summit", "Wildflower Meadows"],
        nearbyParks: ["Olympic", "North Cascades", "Mount St. Helens"],
        avgTemps: {
            1: { high: 37, low: 19 }, 2: { high: 40, low: 20 }, 3: { high: 45, low: 25 },
            4: { high: 52, low: 30 }, 5: { high: 61, low: 37 }, 6: { high: 68, low: 43 },
            7: { high: 76, low: 48 }, 8: { high: 76, low: 48 }, 9: { high: 69, low: 42 },
            10: { high: 57, low: 34 }, 11: { high: 44, low: 26 }, 12: { high: 38, low: 21 }
        },
        hikes: [
            {
                name: "Skyline Trail",
                distance: 5.5,
                elevation: 1400,
                difficulty: "moderate",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Wildflower meadows and glacier views"
            },
            {
                name: "Silver Falls Trail",
                distance: 3.0,
                elevation: 700,
                difficulty: "moderate",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Waterfall behind the falls"
            },
            {
                name: "Trail of the Shadows",
                distance: 0.7,
                elevation: 50,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: true,
                description: "Historic nature trail"
            }
        ]
    },
    "North Cascades": {
        state: "WA",
        coords: [48.7718, -121.2985],
        minDays: 2,
        optimalDays: 3,
        bestMonths: [7, 8, 9],
        highlights: ["Diablo Lake", "Washington Pass", "Cascade Pass", "Blue Lake"],
        nearbyParks: ["Olympic", "Mount Rainier", "Mount St. Helens"],
        avgTemps: {
            1: { high: 33, low: 21 }, 2: { high: 38, low: 24 }, 3: { high: 46, low: 29 },
            4: { high: 56, low: 35 }, 5: { high: 65, low: 42 }, 6: { high: 72, low: 48 },
            7: { high: 78, low: 52 }, 8: { high: 78, low: 52 }, 9: { high: 70, low: 46 },
            10: { high: 57, low: 37 }, 11: { high: 42, low: 29 }, 12: { high: 35, low: 23 }
        },
        hikes: [
            {
                name: "Blue Lake Trail",
                distance: 4.4,
                elevation: 1000,
                difficulty: "moderate",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Alpine lake with mountain views"
            },
            {
                name: "Diablo Lake Overlook",
                distance: 1.6,
                elevation: 200,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: false,
                description: "Turquoise glacial lake views"
            },
            {
                name: "Cascade Pass",
                distance: 7.4,
                elevation: 1800,
                difficulty: "hard",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Historic mountain pass"
            }
        ]
    },
    "Mount St. Helens": {
        state: "WA",
        coords: [46.1912, -122.1944],
        minDays: 1,
        optimalDays: 2,
        bestMonths: [5, 6, 7, 8, 9, 10],
        highlights: ["Johnston Ridge Observatory", "Crater Rim Trail", "Ape Cave", "Spirit Lake"],
        nearbyParks: ["Mount Rainier", "Olympic"],
        avgTemps: {
            1: { high: 35, low: 20 }, 2: { high: 40, low: 23 }, 3: { high: 47, low: 28 },
            4: { high: 55, low: 33 }, 5: { high: 64, low: 40 }, 6: { high: 71, low: 46 },
            7: { high: 78, low: 50 }, 8: { high: 78, low: 50 }, 9: { high: 71, low: 44 },
            10: { high: 59, low: 36 }, 11: { high: 44, low: 28 }, 12: { high: 36, low: 21 }
        },
        hikes: [
            {
                name: "Johnston Ridge Observatory Trail",
                distance: 1.0,
                elevation: 100,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: true,
                description: "Paved trail with volcano views"
            },
            {
                name: "Boundary Trail to Coldwater Lake",
                distance: 5.6,
                elevation: 400,
                difficulty: "moderate",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Lake formed by 1980 eruption"
            },
            {
                name: "Ape Cave",
                distance: 1.5,
                elevation: 200,
                difficulty: "moderate",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Lava tube cave exploration"
            }
        ]
    },
    "Crater Lake": {
        state: "OR",
        coords: [42.8684, -122.1685],
        minDays: 2,
        optimalDays: 3,
        bestMonths: [7, 8, 9],
        highlights: ["Crater Lake", "Rim Drive", "Wizard Island", "Mount Scott"],
        nearbyParks: ["Redwood"],
        avgTemps: {
            1: { high: 33, low: 18 }, 2: { high: 35, low: 19 }, 3: { high: 38, low: 21 },
            4: { high: 43, low: 25 }, 5: { high: 52, low: 31 }, 6: { high: 61, low: 37 },
            7: { high: 69, low: 43 }, 8: { high: 69, low: 42 }, 9: { high: 63, low: 37 },
            10: { high: 52, low: 30 }, 11: { high: 40, low: 23 }, 12: { high: 34, low: 19 }
        },
        hikes: [
            {
                name: "Rim Trail",
                distance: 1.7,
                elevation: 200,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: true,
                description: "Crater Lake rim views"
            },
            {
                name: "Mount Scott",
                distance: 5.0,
                elevation: 1250,
                difficulty: "moderate",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Highest peak in park"
            },
            {
                name: "Cleetwood Cove",
                distance: 2.2,
                elevation: 700,
                difficulty: "moderate",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Only lake access trail"
            }
        ]
    },
    "Yellowstone": {
        state: "WY/MT/ID",
        coords: [44.4280, -110.5885],
        minDays: 3,
        optimalDays: 5,
        bestMonths: [5, 6, 7, 8, 9],
        highlights: ["Old Faithful", "Grand Prismatic", "Wildlife viewing", "Grand Canyon of Yellowstone"],
        nearbyParks: ["Grand Teton", "Glacier"],
        avgTemps: {
            1: { high: 28, low: 5 }, 2: { high: 33, low: 8 }, 3: { high: 42, low: 17 },
            4: { high: 53, low: 26 }, 5: { high: 64, low: 34 }, 6: { high: 74, low: 42 },
            7: { high: 82, low: 47 }, 8: { high: 80, low: 45 }, 9: { high: 70, low: 37 },
            10: { high: 55, low: 26 }, 11: { high: 37, low: 14 }, 12: { high: 29, low: 6 }
        },
        hikes: [
            {
                name: "Old Faithful Geyser Loop",
                distance: 0.7,
                elevation: 50,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: true,
                description: "Paved boardwalk around the famous geyser"
            },
            {
                name: "Grand Prismatic Overlook",
                distance: 1.6,
                elevation: 105,
                difficulty: "easy",
                toddlerFriendly: true,
                strollerFriendly: false,
                description: "Best views of the colorful hot spring"
            },
            {
                name: "Mount Washburn",
                distance: 6.2,
                elevation: 1400,
                difficulty: "moderate",
                toddlerFriendly: false,
                strollerFriendly: false,
                description: "Panoramic views from fire lookout tower"
            }
        ]
    }
};

// Major US cities coordinates
const cities = {
    "New York": [40.7128, -74.0060],
    "Los Angeles": [34.0522, -118.2437],
    "Chicago": [41.8781, -87.6298],
    "Houston": [29.7604, -95.3698],
    "Phoenix": [33.4484, -112.0740],
    "Philadelphia": [39.9526, -75.1652],
    "San Antonio": [29.4241, -98.4936],
    "San Diego": [32.7157, -117.1611],
    "Dallas": [32.7767, -96.7970],
    "San Jose": [37.3382, -121.8863],
    "Austin": [30.2672, -97.7431],
    "Jacksonville": [30.3322, -81.6557],
    "Fort Worth": [32.7555, -97.3308],
    "Columbus": [39.9612, -82.9988],
    "Charlotte": [35.2271, -80.8431],
    "San Francisco": [37.7749, -122.4194],
    "Indianapolis": [39.7684, -86.1581],
    "Seattle": [47.6062, -122.3321],
    "Denver": [39.7392, -104.9903],
    "Boston": [42.3601, -71.0589],
    "Nashville": [36.1627, -86.7816],
    "Detroit": [42.3314, -83.0458],
    "Portland": [45.5152, -122.6784],
    "Las Vegas": [36.1699, -115.1398],
    "Miami": [25.7617, -80.1918],
    "Atlanta": [33.7490, -84.3880],
    "Salt Lake City": [40.7608, -111.8910]
};

// Park Images
const parkImages = {
    "Olympic": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center",
    "Mount Rainier": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    "North Cascades": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center",
    "Mount St. Helens": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    "Crater Lake": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    "Yellowstone": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    "Grand Teton": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=800&h=400&fit=crop&crop=center",
    "Glacier": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center",
    "Yosemite": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop&crop=center",
    "Sequoia": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center",
    "Kings Canyon": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    "Death Valley": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=400&fit=crop&crop=center",
    "Joshua Tree": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop&crop=center",
    "Grand Canyon": "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&h=400&fit=crop&crop=center",
    "Zion": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=400&fit=crop&crop=center",
    "Bryce Canyon": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    "Arches": "https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=800&h=400&fit=crop&crop=center",
    "Canyonlands": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    "Rocky Mountain": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center",
    "Great Sand Dunes": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=400&fit=crop&crop=center",
    "Great Smoky Mountains": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center",
    "Mammoth Cave": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center",
    "Acadia": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    "Everglades": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&crop=center"
};

// Nature elements for background animation
const natureElements = ['🏔️', '🌲', '🌳', '🦅', '🌵', '💧', '🏞️', '🌿', '🦋', '🌸'];

function createNatureBackground() {
    const background = document.getElementById('natureBackground');
    background.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = natureElements[Math.floor(Math.random() * natureElements.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        background.appendChild(element);
    }
}

// Initialize nature background
document.addEventListener('DOMContentLoaded', function() {
    createNatureBackground();
});

function calculateDistance(coord1, coord2) {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    
    const R = 3956; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
             Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function generateItinerary() {
    const startLocation = document.getElementById('startLocation').value;
    const totalDays = parseInt(document.getElementById('totalDays').value);
    const travelMonth = parseInt(document.getElementById('travelMonth').value);
    
    // Enhanced validation
    if (!startLocation) {
        alert('Please select a starting location');
        return;
    }
    
    if (!totalDays || totalDays < 1 || totalDays > 30) {
        alert('Please enter a valid number of days (1-30)');
        return;
    }
    
    if (!travelMonth || travelMonth < 1 || travelMonth > 12) {
        alert('Please select a valid travel month');
        return;
    }
    
    const startCoords = cities[startLocation];
    if (!startCoords) {
        // Fallback to Denver if location not found
        console.warn(`Location '${startLocation}' not found. Using Denver, CO as default starting point.`);
        const denverCoords = cities["Denver"];
        if (denverCoords) {
            displayParkSelection(findNearbyParks(denverCoords, 800), "Denver", totalDays, travelMonth, denverCoords);
            return;
        } else {
            alert('Starting location not found. Please select from the dropdown.');
            return;
        }
    }
    
    try {
        // Find nearby parks and show selection interface
        const nearbyParks = findNearbyParks(startCoords, 800);
        
        if (nearbyParks.length === 0) {
            alert('No national parks found within 800 miles of your starting location. Try a different city.');
            return;
        }
        
        displayParkSelection(nearbyParks, startLocation, totalDays, travelMonth, startCoords);
    } catch (error) {
        console.error('Error generating itinerary:', error);
        alert('An error occurred while generating your itinerary. Please try again.');
    }
}

function findNearbyParks(startCoords, maxDistance) {
    const nearbyParks = [];
    for (const [parkName, parkInfo] of Object.entries(parks)) {
        const distance = calculateDistance(startCoords, parkInfo.coords);
        if (distance <= maxDistance) {
            nearbyParks.push({
                name: parkName,
                distance: distance,
                ...parkInfo
            });
        }
    }
    
    // Sort by distance
    nearbyParks.sort((a, b) => a.distance - b.distance);
    return nearbyParks;
}

function displayParkSelection(nearbyParks, startLocation, totalDays, travelMonth, startCoords) {
    const resultsSection = document.getElementById('results');
    
    let html = `
        <div class="park-selection">
            <h3>🎯 Select Parks for Your Trip</h3>
            <p style="margin-bottom: 15px; font-size: 13px; color: #666;">
                Found ${nearbyParks.length} parks within driving distance from ${startLocation}. 
                Select the ones you'd like to visit:
            </p>
            <div id="parksList">
    `;
    
    nearbyParks.forEach(park => {
        const seasonalIndicator = park.bestMonths.includes(travelMonth) ? '🌟' : '❄️';
        html += `
            <div class="park-checkbox-item">
                <input type="checkbox" id="park-${park.name.replace(/\s+/g, '')}" 
                       value="${park.name}" onchange="updateRouteButton()">
                <div class="park-info">
                    <label for="park-${park.name.replace(/\s+/g, '')}" style="cursor: pointer;">
                        ${seasonalIndicator} ${park.name} (${park.state})
                    </label>
                    <span class="park-distance">${Math.round(park.distance)} miles</span>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
            <button class="generate-route-btn" id="generateRouteBtn" onclick="generateSelectedRoute()" disabled>
                Generate Route (Select parks first)
            </button>
        </div>
    `;
    
    resultsSection.innerHTML = html;
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Store data for route generation
    window.tripData = {
        nearbyParks,
        startLocation,
        totalDays,
        travelMonth,
        startCoords
    };
}

function updateRouteButton() {
    const selectedParks = document.querySelectorAll('#parksList input:checked');
    const button = document.getElementById('generateRouteBtn');
    
    if (selectedParks.length > 0) {
        button.disabled = false;
        button.textContent = `Generate Route (${selectedParks.length} parks selected)`;
    } else {
        button.disabled = true;
        button.textContent = 'Generate Route (Select parks first)';
    }
}

function generateSelectedRoute() {
    const selectedParkNames = Array.from(document.querySelectorAll('#parksList input:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedParkNames.length === 0) {
        alert('Please select at least one park');
        return;
    }
    
    const { nearbyParks, startLocation, totalDays, travelMonth, startCoords } = window.tripData;
    
    // Filter selected parks and create optimized route
    const selectedParks = nearbyParks.filter(park => selectedParkNames.includes(park.name));
    const optimizedRoute = createOptimizedRoute(selectedParks, startCoords, totalDays, travelMonth, startLocation);
    
    displayFinalItinerary(optimizedRoute);
}

function createOptimizedRoute(selectedParks, startCoords, totalDays, travelMonth, startLocation) {
    // Simple optimization: sort by longitude for east-west routing
    const sortedParks = [...selectedParks].sort((a, b) => a.coords[1] - b.coords[1]);
    
    const itinerary = {
        startingLocation: startLocation,
        totalDays: totalDays,
        month: travelMonth,
        parks: [],
        totalDrivingMiles: 0,
        recommendations: [],
        isCustomRoute: true,
        startCoords: startCoords
    };
    
    let remainingDays = totalDays;
    let currentLocation = startCoords;
    
    // First pass: allocate minimum days to all selected parks
    const parkAllocations = [];
    let totalMinDays = 0;
    
    for (const park of sortedParks) {
        totalMinDays += park.minDays;
        parkAllocations.push({
            park: park,
            allocatedDays: park.minDays
        });
    }
    
    // If we have more days than minimum required, distribute extra days
    let extraDays = totalDays - totalMinDays;
    if (extraDays > 0) {
        for (const allocation of parkAllocations) {
            const additionalDays = Math.min(extraDays, allocation.park.optimalDays - allocation.allocatedDays);
            allocation.allocatedDays += additionalDays;
            extraDays -= additionalDays;
            if (extraDays <= 0) break;
        }
    }
    
    // If we still have extra days, distribute them evenly
    if (extraDays > 0) {
        const extraPerPark = Math.floor(extraDays / parkAllocations.length);
        const remainder = extraDays % parkAllocations.length;
        
        for (let i = 0; i < parkAllocations.length; i++) {
            parkAllocations[i].allocatedDays += extraPerPark;
            if (i < remainder) {
                parkAllocations[i].allocatedDays += 1;
            }
        }
    }
    
    // Build the itinerary with all selected parks
    for (const allocation of parkAllocations) {
        const park = allocation.park;
        const daysAtPark = allocation.allocatedDays;
        
        const drivingDistance = calculateDistance(currentLocation, park.coords);
        
        itinerary.parks.push({
            name: park.name,
            state: park.state,
            days: daysAtPark,
            drivingMilesFromPrevious: Math.round(drivingDistance * 10) / 10,
            seasonalFit: park.bestMonths.includes(travelMonth),
            highlights: park.highlights.slice(0, 3),
            avgTemps: park.avgTemps[travelMonth],
            hikes: park.hikes,
            coords: park.coords
        });
        
        itinerary.totalDrivingMiles += drivingDistance;
        currentLocation = park.coords;
    }
    
    // Update recommendations based on day allocation
    const actualTotalDays = parkAllocations.reduce((sum, allocation) => sum + allocation.allocatedDays, 0);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (actualTotalDays < totalDays) {
        const extraDays = totalDays - actualTotalDays;
        itinerary.recommendations.push(`You have ${extraDays} extra days - consider extending stays at your favorite parks`);
    } else if (totalMinDays > totalDays) {
        const shortfall = totalMinDays - totalDays;
        itinerary.recommendations.push(`Note: You selected parks requiring ${totalMinDays} minimum days, but only have ${totalDays} days available. Consider extending your trip by ${shortfall} days for the full experience.`);
    }
    
    // Add seasonal recommendation
    const seasonalParks = parkAllocations.filter(allocation => allocation.park.bestMonths.includes(travelMonth));
    if (seasonalParks.length === 0) {
        itinerary.recommendations.push(`Note: ${monthNames[travelMonth - 1]} might not be optimal season for these parks. Consider spring/summer/fall visits for better weather and accessibility.`);
    }

    
    itinerary.totalDrivingMiles = Math.round(itinerary.totalDrivingMiles * 10) / 10;
    
    return itinerary;
}

function displayFinalItinerary(itinerary) {
    // Store current itinerary for download functionality
    window.currentItinerary = itinerary;
    
    const resultsSection = document.getElementById('results');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
    
    let html = `
        <div class="itinerary-header">
            <h2>🏞️ Your Custom National Parks Route</h2>
            <div class="trip-stats">
                <div class="stat-item">
                    <div class="stat-value">${itinerary.startingLocation}</div>
                    <div class="stat-label">Starting Point</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${itinerary.totalDays}</div>
                    <div class="stat-label">Total Days</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${monthNames[itinerary.month - 1]}</div>
                    <div class="stat-label">Travel Month</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${itinerary.totalDrivingMiles}</div>
                    <div class="stat-label">Total Miles</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${itinerary.parks.length}</div>
                    <div class="stat-label">Parks to Visit</div>
                </div>
            </div>
        </div>
        
        <div class="parks-list">
    `;
    
    let cumulativeDistance = 0;
    
    itinerary.parks.forEach((park, index) => {
        const seasonalIndicator = park.seasonalFit ? '🌟' : '❄️';
        const parkImage = parkImages[park.name] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center';
        
        // Add current segment distance to cumulative total
        cumulativeDistance += park.drivingMilesFromPrevious;
        
        html += `
            <div class="park-card">
                <img src="${parkImage}" alt="${park.name} National Park" class="park-image" loading="lazy">
                <div class="park-header">
                    <div class="park-name">${index + 1}. ${park.name} (${park.state})</div>
                    <div class="seasonal-indicator">${seasonalIndicator}</div>
                </div>
                <div class="park-details">
                    <div class="detail-item">
                        <div class="detail-value">${park.days}</div>
                        <div>Days</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${park.drivingMilesFromPrevious}</div>
                        <div>${index === 0 ? 'From Start' : 'From Previous'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${Math.round(cumulativeDistance)}</div>
                        <div>Total Miles</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${park.seasonalFit ? 'Optimal' : 'Off-Season'}</div>
                        <div>Season</div>
                    </div>
                </div>
                
                <div class="weather-info">
                    <h4>🌡️ Expected Weather</h4>
                    <div class="weather-grid">
                        <div class="weather-item">
                            <div class="weather-value">${park.avgTemps.high}°F</div>
                            <div>High</div>
                        </div>
                        <div class="weather-item">
                            <div class="weather-value">${park.avgTemps.low}°F</div>
                            <div>Low</div>
                        </div>
                        <div class="weather-item">
                            <div class="weather-value">${Math.round((park.avgTemps.high + park.avgTemps.low) / 2)}°F</div>
                            <div>Avg</div>
                        </div>
                    </div>
                </div>
                
                <div class="highlights">
                    <h4>Must-See Highlights:</h4>
                    <div class="highlights-list">
                        ${park.highlights.map(highlight => `<span class="highlight-tag">${highlight}</span>`).join('')}
                    </div>
                </div>
                
                <div class="hiking-section">
                    <div class="hiking-header">
                        <h4>🥾 Recommended Hikes</h4>
                    </div>
                    <div class="hikes-grid">
                        ${park.hikes.map(hike => `
                            <div class="hike-card difficulty-${hike.difficulty}">
                                <div class="hike-name">${hike.name}</div>
                                <div class="hike-details">
                                    <div class="hike-detail">
                                        <div class="hike-detail-value">${hike.distance}</div>
                                        <div>Miles</div>
                                    </div>
                                    <div class="hike-detail">
                                        <div class="hike-detail-value">${hike.elevation}</div>
                                        <div>Elevation</div>
                                    </div>
                                    <div class="hike-detail">
                                        <div class="hike-detail-value">${hike.difficulty}</div>
                                        <div>Difficulty</div>
                                    </div>
                                </div>
                                <div class="hike-description" style="margin: 8px 0; font-size: 12px; color: #666; font-style: italic;">${hike.description}</div>
                                <div class="family-friendly">
                                    <div class="friendly-tag ${hike.toddlerFriendly ? 'yes' : 'no'}">
                                        ${hike.toddlerFriendly ? '👶' : '🚫'} Toddler Friendly
                                    </div>
                                    <div class="friendly-tag ${hike.strollerFriendly ? 'yes' : 'no'}">
                                        ${hike.strollerFriendly ? '🚼' : '🚫'} Stroller Friendly
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <a href="https://www.google.com/maps/search/${encodeURIComponent(park.name + ' National Park')}" 
                   target="_blank" class="google-maps-link">
                    📍 View on Google Maps
                </a>
            </div>
        `;
    });
    
    html += '</div>';
    
    // Add trip summary
    const totalParks = itinerary.parks.length;
    const totalDays = itinerary.parks.reduce((sum, park) => sum + park.days, 0);
    const optimalSeasonParks = itinerary.parks.filter(park => park.seasonalFit).length;
    
    html += `
        <div class="trip-summary">
            <h3>📊 Trip Summary</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-value">${totalParks}</div>
                    <div>National Parks</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${totalDays}</div>
                    <div>Total Days</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${itinerary.totalDrivingMiles}</div>
                    <div>Total Miles</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${optimalSeasonParks}/${totalParks}</div>
                    <div>Optimal Season</div>
                </div>
            </div>
        </div>
    `;
    
    // Add sharing functionality
    const shareUrl = generateShareableUrl(itinerary);
    html += `
        <div class="share-section">
            <h4>🔗 Share Your Itinerary</h4>
            <div class="share-url-container">
                <input type="text" class="share-url" value="${shareUrl}" readonly>
                <button class="copy-btn" onclick="copyToClipboard('${shareUrl}')">Copy Link</button>
            </div>
            <div class="share-buttons">
                <a href="mailto:?subject=My National Parks Itinerary&body=Check out my national parks trip plan: ${encodeURIComponent(shareUrl)}" 
                   class="share-btn email">📧 Email</a>
                <a href="https://twitter.com/intent/tweet?text=Planning an amazing ${totalParks}-park road trip!&url=${encodeURIComponent(shareUrl)}" 
                   target="_blank" class="share-btn twitter">🐦 Twitter</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" 
                   target="_blank" class="share-btn facebook">📘 Facebook</a>
                <a href="https://wa.me/?text=Check out my national parks itinerary: ${encodeURIComponent(shareUrl)}" 
                   target="_blank" class="share-btn whatsapp">💬 WhatsApp</a>
                <button class="share-btn" style="background: #28a745;" onclick="downloadItinerary()">💾 Download JSON</button>
            </div>
        </div>
    `;
    
    if (itinerary.recommendations.length > 0) {
        html += `
            <div class="recommendations">
                <h3>💡 Recommendations</h3>
                <ul>
                    ${itinerary.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    resultsSection.innerHTML = html;
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate shareable URL for itinerary
function generateShareableUrl(itinerary) {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
        start: itinerary.startingLocation,
        days: itinerary.totalDays,
        month: itinerary.month,
        parks: itinerary.parks.map(p => p.name).join(',')
    });
    return `${baseUrl}?${params.toString()}`;
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}

// Download itinerary as JSON file
function downloadItinerary() {
    if (!window.currentItinerary) {
        alert('No itinerary to download. Please generate an itinerary first.');
        return;
    }
    
    const itinerary = window.currentItinerary;
    const filename = `itinerary_${itinerary.startingLocation.replace(/\s+/g, '_')}_${itinerary.totalDays}days.json`;
    
    const dataStr = JSON.stringify(itinerary, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show confirmation
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '✅ Downloaded!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

// Set current month as default and handle shared URLs
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('travelMonth').value = new Date().getMonth() + 1;
    
    // Check for shared itinerary parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('start') && urlParams.has('parks')) {
        loadSharedItinerary(urlParams);
    }
});

// Load shared itinerary from URL parameters
function loadSharedItinerary(params) {
    const startLocation = params.get('start');
    const totalDays = parseInt(params.get('days')) || 7;
    const travelMonth = parseInt(params.get('month')) || new Date().getMonth() + 1;
    const parkNames = params.get('parks').split(',');
    
    // Set form values
    document.getElementById('startLocation').value = startLocation;
    document.getElementById('totalDays').value = totalDays;
    document.getElementById('travelMonth').value = travelMonth;
    
    // Auto-generate the itinerary
    setTimeout(() => {
        const startCoords = cities[startLocation];
        if (startCoords) {
            const nearbyParks = findNearbyParks(startCoords, 800);
            const selectedParks = nearbyParks.filter(park => parkNames.includes(park.name));
            
            if (selectedParks.length > 0) {
                const optimizedRoute = createOptimizedRoute(selectedParks, startCoords, totalDays, travelMonth, startLocation);
                displayFinalItinerary(optimizedRoute);
            }
        }
    }, 100);
}
// Add remaining parks from original database
parks["Grand Teton"] = {
    state: "WY",
    coords: [43.7904, -110.6818],
    minDays: 2,
    optimalDays: 3,
    bestMonths: [6, 7, 8, 9],
    highlights: ["Teton Range", "Jenny Lake", "Snake River", "Wildlife"],
    nearbyParks: ["Yellowstone"],
    avgTemps: {
        1: { high: 26, low: -1 }, 2: { high: 32, low: 4 }, 3: { high: 43, low: 15 },
        4: { high: 54, low: 25 }, 5: { high: 65, low: 33 }, 6: { high: 75, low: 40 },
        7: { high: 82, low: 45 }, 8: { high: 81, low: 43 }, 9: { high: 71, low: 35 },
        10: { high: 57, low: 24 }, 11: { high: 38, low: 12 }, 12: { high: 27, low: 1 }
    },
    hikes: [
        {
            name: "Jenny Lake Loop",
            distance: 7.1,
            elevation: 200,
            difficulty: "easy",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Scenic lake loop with mountain views"
        },
        {
            name: "Taggart Lake",
            distance: 3.0,
            elevation: 400,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Beautiful alpine lake hike"
        },
        {
            name: "Cascade Canyon",
            distance: 9.6,
            elevation: 1100,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Classic Teton canyon hike"
        }
    ]
};

parks["Glacier"] = {
    state: "MT",
    coords: [48.7596, -113.7870],
    minDays: 3,
    optimalDays: 4,
    bestMonths: [7, 8, 9],
    highlights: ["Going-to-the-Sun Road", "Lake McDonald", "Many Glacier", "Hiking trails"],
    nearbyParks: ["Yellowstone"],
    avgTemps: {
        1: { high: 27, low: 15 }, 2: { high: 33, low: 19 }, 3: { high: 43, low: 26 },
        4: { high: 55, low: 33 }, 5: { high: 65, low: 41 }, 6: { high: 72, low: 48 },
        7: { high: 79, low: 52 }, 8: { high: 78, low: 51 }, 9: { high: 67, low: 43 },
        10: { high: 52, low: 34 }, 11: { high: 36, low: 25 }, 12: { high: 29, low: 18 }
    },
    hikes: [
        {
            name: "Trail of the Cedars",
            distance: 0.7,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Boardwalk through old-growth forest"
        },
        {
            name: "Hidden Lake Overlook",
            distance: 2.7,
            elevation: 460,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Alpine lake views and wildlife"
        },
        {
            name: "Grinnell Glacier",
            distance: 10.6,
            elevation: 1600,
            difficulty: "hard",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Challenging hike to active glacier"
        }
    ]
};

parks["Yosemite"] = {
    state: "CA",
    coords: [37.8651, -119.5383],
    minDays: 3,
    optimalDays: 5,
    bestMonths: [4, 5, 6, 9, 10],
    highlights: ["Half Dome", "El Capitan", "Yosemite Falls", "Mariposa Grove"],
    nearbyParks: ["Sequoia", "Kings Canyon", "Death Valley"],
    avgTemps: {
        1: { high: 49, low: 26 }, 2: { high: 55, low: 30 }, 3: { high: 60, low: 35 },
        4: { high: 67, low: 40 }, 5: { high: 76, low: 48 }, 6: { high: 85, low: 55 },
        7: { high: 90, low: 60 }, 8: { high: 90, low: 59 }, 9: { high: 84, low: 52 },
        10: { high: 73, low: 42 }, 11: { high: 58, low: 32 }, 12: { high: 48, low: 26 }
    },
    hikes: [
        {
            name: "Valley View Trail",
            distance: 2.0,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Paved trail with iconic valley views"
        },
        {
            name: "Mist Trail to Vernal Fall",
            distance: 5.4,
            elevation: 1000,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Steep granite steps to waterfall"
        },
        {
            name: "Half Dome",
            distance: 16.0,
            elevation: 4800,
            difficulty: "hard",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Iconic cables climb (permit required)"
        }
    ]
};

parks["Grand Canyon"] = {
    state: "AZ",
    coords: [36.1069, -112.1129],
    minDays: 2,
    optimalDays: 4,
    bestMonths: [3, 4, 5, 9, 10, 11],
    highlights: ["South Rim", "North Rim", "Desert View", "Bright Angel Trail"],
    nearbyParks: ["Zion", "Bryce Canyon"],
    avgTemps: {
        1: { high: 45, low: 18 }, 2: { high: 50, low: 21 }, 3: { high: 57, low: 28 },
        4: { high: 66, low: 35 }, 5: { high: 76, low: 42 }, 6: { high: 86, low: 50 },
        7: { high: 89, low: 58 }, 8: { high: 86, low: 56 }, 9: { high: 79, low: 49 },
        10: { high: 68, low: 37 }, 11: { high: 54, low: 27 }, 12: { high: 45, low: 20 }
    },
    hikes: [
        {
            name: "Rim Trail",
            distance: 13.0,
            elevation: 200,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Paved trail along canyon rim"
        },
        {
            name: "Bright Angel Trail to 1.5 Mile",
            distance: 3.0,
            elevation: 1100,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Historic trail into canyon"
        },
        {
            name: "South Kaibab to Ooh Aah Point",
            distance: 1.8,
            elevation: 600,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Spectacular canyon views"
        }
    ]
};
parks["Zion"] = {
    state: "UT",
    coords: [37.2982, -113.0263],
    minDays: 2,
    optimalDays: 4,
    bestMonths: [3, 4, 5, 9, 10, 11],
    highlights: ["Angels Landing", "The Narrows", "Emerald Pools", "Canyon Junction Bridge"],
    nearbyParks: ["Bryce Canyon", "Grand Canyon"],
    avgTemps: {
        1: { high: 52, low: 29 }, 2: { high: 57, low: 31 }, 3: { high: 63, low: 36 },
        4: { high: 73, low: 43 }, 5: { high: 83, low: 52 }, 6: { high: 93, low: 60 },
        7: { high: 100, low: 68 }, 8: { high: 97, low: 66 }, 9: { high: 91, low: 57 },
        10: { high: 78, low: 45 }, 11: { high: 63, low: 35 }, 12: { high: 52, low: 28 }
    },
    hikes: [
        {
            name: "Riverside Walk",
            distance: 2.2,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Paved path along Virgin River"
        },
        {
            name: "Emerald Pools Trail",
            distance: 2.4,
            elevation: 350,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Waterfalls and hanging gardens"
        },
        {
            name: "Angels Landing",
            distance: 5.4,
            elevation: 1500,
            difficulty: "hard",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Chains section to narrow ridge (permit required)"
        }
    ]
};

parks["Bryce Canyon"] = {
    state: "UT",
    coords: [37.5930, -112.1871],
    minDays: 1,
    optimalDays: 2,
    bestMonths: [4, 5, 6, 9, 10],
    highlights: ["Bryce Amphitheater", "Sunrise Point", "Sunset Point", "Navajo Loop Trail"],
    nearbyParks: ["Zion", "Grand Canyon"],
    avgTemps: {
        1: { high: 37, low: 9 }, 2: { high: 41, low: 13 }, 3: { high: 48, low: 19 },
        4: { high: 56, low: 25 }, 5: { high: 66, low: 31 }, 6: { high: 76, low: 39 },
        7: { high: 83, low: 47 }, 8: { high: 80, low: 45 }, 9: { high: 73, low: 37 },
        10: { high: 61, low: 28 }, 11: { high: 46, low: 18 }, 12: { high: 37, low: 10 }
    },
    hikes: [
        {
            name: "Rim Trail",
            distance: 1.1,
            elevation: 100,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Paved trail between viewpoints"
        },
        {
            name: "Navajo Loop",
            distance: 1.5,
            elevation: 550,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Descent into hoodoo formations"
        },
        {
            name: "Fairyland Loop",
            distance: 8.0,
            elevation: 900,
            difficulty: "hard",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Full loop through hoodoo wonderland"
        }
    ]
};

parks["Arches"] = {
    state: "UT",
    coords: [38.7331, -109.5925],
    minDays: 1,
    optimalDays: 2,
    bestMonths: [3, 4, 5, 9, 10, 11],
    highlights: ["Delicate Arch", "Landscape Arch", "Fiery Furnace", "Courthouse Towers"],
    nearbyParks: ["Canyonlands"],
    avgTemps: {
        1: { high: 43, low: 22 }, 2: { high: 52, low: 28 }, 3: { high: 64, low: 37 },
        4: { high: 71, low: 43 }, 5: { high: 82, low: 53 }, 6: { high: 93, low: 62 },
        7: { high: 100, low: 69 }, 8: { high: 97, low: 67 }, 9: { high: 88, low: 57 },
        10: { high: 74, low: 44 }, 11: { high: 57, low: 31 }, 12: { high: 44, low: 23 }
    },
    hikes: [
        {
            name: "Delicate Arch",
            distance: 3.0,
            elevation: 480,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Utah's most famous arch"
        },
        {
            name: "Windows Section",
            distance: 1.0,
            elevation: 140,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Multiple large arches"
        },
        {
            name: "Landscape Arch",
            distance: 1.6,
            elevation: 200,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Longest natural arch in North America"
        }
    ]
};

parks["Canyonlands"] = {
    state: "UT",
    coords: [38.2619, -109.9275],
    minDays: 2,
    optimalDays: 3,
    bestMonths: [3, 4, 5, 9, 10, 11],
    highlights: ["Mesa Arch", "Grand View Point", "Island in the Sky", "The Needles"],
    nearbyParks: ["Arches"],
    avgTemps: {
        1: { high: 42, low: 20 }, 2: { high: 50, low: 26 }, 3: { high: 62, low: 35 },
        4: { high: 70, low: 42 }, 5: { high: 81, low: 51 }, 6: { high: 91, low: 60 },
        7: { high: 98, low: 67 }, 8: { high: 95, low: 65 }, 9: { high: 86, low: 55 },
        10: { high: 72, low: 42 }, 11: { high: 55, low: 29 }, 12: { high: 43, low: 21 }
    },
    hikes: [
        {
            name: "Mesa Arch Loop",
            distance: 0.5,
            elevation: 80,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Famous sunrise arch"
        },
        {
            name: "Grand View Point Overlook",
            distance: 2.0,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Expansive canyon views"
        },
        {
            name: "Upheaval Dome Overlook",
            distance: 3.0,
            elevation: 400,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Mysterious geological formation"
        }
    ]
};
parks["Rocky Mountain"] = {
    state: "CO",
    coords: [40.3428, -105.6836],
    minDays: 2,
    optimalDays: 4,
    bestMonths: [6, 7, 8, 9],
    highlights: ["Trail Ridge Road", "Bear Lake", "Sprague Lake", "Alberta Falls"],
    nearbyParks: ["Great Sand Dunes"],
    avgTemps: {
        1: { high: 26, low: -2 }, 2: { high: 30, low: 2 }, 3: { high: 38, low: 10 },
        4: { high: 46, low: 18 }, 5: { high: 56, low: 27 }, 6: { high: 66, low: 35 },
        7: { high: 73, low: 41 }, 8: { high: 71, low: 39 }, 9: { high: 63, low: 31 },
        10: { high: 52, low: 21 }, 11: { high: 37, low: 8 }, 12: { high: 28, low: 0 }
    },
    hikes: [
        {
            name: "Bear Lake Loop",
            distance: 0.6,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Scenic alpine lake loop"
        },
        {
            name: "Sprague Lake",
            distance: 0.9,
            elevation: 100,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Wheelchair accessible with mountain reflections"
        },
        {
            name: "Emerald Lake",
            distance: 3.2,
            elevation: 650,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Three beautiful alpine lakes"
        }
    ]
};

parks["Great Sand Dunes"] = {
    state: "CO",
    coords: [37.7916, -105.5943],
    minDays: 1,
    optimalDays: 2,
    bestMonths: [4, 5, 6, 9, 10],
    highlights: ["Star Dune", "High Dune", "Medano Creek", "Sand sledding"],
    nearbyParks: ["Rocky Mountain"],
    avgTemps: {
        1: { high: 35, low: -5 }, 2: { high: 42, low: 2 }, 3: { high: 52, low: 12 },
        4: { high: 61, low: 20 }, 5: { high: 71, low: 30 }, 6: { high: 81, low: 39 },
        7: { high: 85, low: 45 }, 8: { high: 82, low: 43 }, 9: { high: 75, low: 35 },
        10: { high: 63, low: 23 }, 11: { high: 48, low: 9 }, 12: { high: 36, low: -3 }
    },
    hikes: [
        {
            name: "Dunes Overlook Trail",
            distance: 2.2,
            elevation: 200,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Views of the dune field"
        },
        {
            name: "High Dune",
            distance: 2.5,
            elevation: 650,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Climb the tallest accessible dune"
        },
        {
            name: "Medano Creek",
            distance: 1.0,
            elevation: 0,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Seasonal creek for splashing (spring/early summer)"
        }
    ]
};

parks["Sequoia"] = {
    state: "CA",
    coords: [36.4864, -118.5658],
    minDays: 2,
    optimalDays: 3,
    bestMonths: [5, 6, 7, 8, 9, 10],
    highlights: ["General Sherman Tree", "Giant Forest", "Moro Rock", "Crystal Cave"],
    nearbyParks: ["Kings Canyon", "Yosemite"],
    avgTemps: {
        1: { high: 42, low: 24 }, 2: { high: 45, low: 26 }, 3: { high: 50, low: 30 },
        4: { high: 58, low: 35 }, 5: { high: 68, low: 43 }, 6: { high: 78, low: 51 },
        7: { high: 84, low: 57 }, 8: { high: 83, low: 56 }, 9: { high: 77, low: 49 },
        10: { high: 66, low: 39 }, 11: { high: 52, low: 30 }, 12: { high: 43, low: 25 }
    },
    hikes: [
        {
            name: "General Sherman Tree Trail",
            distance: 1.0,
            elevation: 200,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Paved path to world's largest tree"
        },
        {
            name: "Big Trees Trail",
            distance: 1.3,
            elevation: 100,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Wheelchair accessible giant sequoia loop"
        },
        {
            name: "Moro Rock",
            distance: 0.5,
            elevation: 300,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Steep granite dome climb with views"
        }
    ]
};

parks["Kings Canyon"] = {
    state: "CA",
    coords: [36.8879, -118.5551],
    minDays: 2,
    optimalDays: 3,
    bestMonths: [5, 6, 7, 8, 9, 10],
    highlights: ["Kings Canyon Scenic Byway", "Cedar Grove", "Grant Grove", "Zumwalt Meadows"],
    nearbyParks: ["Sequoia", "Yosemite"],
    avgTemps: {
        1: { high: 40, low: 22 }, 2: { high: 43, low: 24 }, 3: { high: 48, low: 28 },
        4: { high: 56, low: 33 }, 5: { high: 66, low: 41 }, 6: { high: 76, low: 49 },
        7: { high: 82, low: 55 }, 8: { high: 81, low: 54 }, 9: { high: 75, low: 47 },
        10: { high: 64, low: 37 }, 11: { high: 50, low: 28 }, 12: { high: 41, low: 23 }
    },
    hikes: [
        {
            name: "Zumwalt Meadows",
            distance: 1.5,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Boardwalk through meadow and river"
        },
        {
            name: "General Grant Tree Trail",
            distance: 0.6,
            elevation: 100,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Nation's Christmas Tree"
        },
        {
            name: "Mist Falls",
            distance: 8.2,
            elevation: 800,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Granite canyon to waterfall"
        }
    ]
};
parks["Death Valley"] = {
    state: "CA/NV",
    coords: [36.2424, -116.8900],
    minDays: 2,
    optimalDays: 3,
    bestMonths: [11, 12, 1, 2, 3, 4],
    highlights: ["Badwater Basin", "Artist's Palette", "Zabriskie Point", "Mesquite Flat Sand Dunes"],
    nearbyParks: ["Joshua Tree", "Yosemite"],
    avgTemps: {
        1: { high: 67, low: 40 }, 2: { high: 73, low: 46 }, 3: { high: 82, low: 55 },
        4: { high: 90, low: 62 }, 5: { high: 100, low: 72 }, 6: { high: 110, low: 81 },
        7: { high: 116, low: 88 }, 8: { high: 114, low: 85 }, 9: { high: 106, low: 75 },
        10: { high: 92, low: 61 }, 11: { high: 76, low: 48 }, 12: { high: 65, low: 39 }
    },
    hikes: [
        {
            name: "Badwater Basin",
            distance: 1.0,
            elevation: 0,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Lowest point in North America"
        },
        {
            name: "Salt Creek Interpretive Trail",
            distance: 1.0,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Boardwalk through desert pupfish habitat"
        },
        {
            name: "Golden Canyon to Red Cathedral",
            distance: 3.0,
            elevation: 300,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Colorful badlands canyon"
        }
    ]
};

parks["Joshua Tree"] = {
    state: "CA",
    coords: [33.8734, -115.9010],
    minDays: 2,
    optimalDays: 3,
    bestMonths: [10, 11, 12, 1, 2, 3, 4],
    highlights: ["Joshua Tree Forest", "Skull Rock", "Keys View", "Rock formations"],
    nearbyParks: ["Death Valley"],
    avgTemps: {
        1: { high: 61, low: 37 }, 2: { high: 65, low: 41 }, 3: { high: 72, low: 47 },
        4: { high: 80, low: 54 }, 5: { high: 90, low: 63 }, 6: { high: 100, low: 72 },
        7: { high: 105, low: 78 }, 8: { high: 103, low: 76 }, 9: { high: 96, low: 68 },
        10: { high: 84, low: 57 }, 11: { high: 71, low: 45 }, 12: { high: 60, low: 36 }
    },
    hikes: [
        {
            name: "Skull Rock",
            distance: 1.7,
            elevation: 100,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Famous skull-shaped rock formation"
        },
        {
            name: "Hidden Valley",
            distance: 1.0,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Enclosed valley with rock formations"
        },
        {
            name: "Ryan Mountain",
            distance: 3.0,
            elevation: 1000,
            difficulty: "moderate",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Panoramic desert views from summit"
        }
    ]
};

parks["Great Smoky Mountains"] = {
    state: "TN/NC",
    coords: [35.6118, -83.4895],
    minDays: 2,
    optimalDays: 4,
    bestMonths: [4, 5, 6, 9, 10],
    highlights: ["Cades Cove", "Cataract Falls", "Chimney Tops", "Appalachian Trail"],
    nearbyParks: ["Mammoth Cave"],
    avgTemps: {
        1: { high: 47, low: 25 }, 2: { high: 52, low: 28 }, 3: { high: 61, low: 35 },
        4: { high: 70, low: 42 }, 5: { high: 78, low: 51 }, 6: { high: 84, low: 59 },
        7: { high: 87, low: 63 }, 8: { high: 86, low: 62 }, 9: { high: 81, low: 55 },
        10: { high: 71, low: 43 }, 11: { high: 60, low: 34 }, 12: { high: 49, low: 27 }
    },
    hikes: [
        {
            name: "Cades Cove Loop Road",
            distance: 11.0,
            elevation: 200,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Historic valley with wildlife viewing"
        },
        {
            name: "Laurel Falls",
            distance: 2.6,
            elevation: 300,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Paved trail to 80-foot waterfall"
        },
        {
            name: "Alum Cave to Mount LeConte",
            distance: 10.9,
            elevation: 2800,
            difficulty: "hard",
            toddlerFriendly: false,
            strollerFriendly: false,
            description: "Challenging hike to third highest peak"
        }
    ]
};

parks["Mammoth Cave"] = {
    state: "KY",
    coords: [37.1862, -86.1004],
    minDays: 1,
    optimalDays: 2,
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    highlights: ["Cave tours", "Green River", "Historic Tour", "Wild Cave Tour"],
    nearbyParks: ["Great Smoky Mountains"],
    avgTemps: {
        1: { high: 42, low: 23 }, 2: { high: 48, low: 27 }, 3: { high: 58, low: 36 },
        4: { high: 69, low: 45 }, 5: { high: 78, low: 54 }, 6: { high: 86, low: 63 },
        7: { high: 89, low: 67 }, 8: { high: 88, low: 65 }, 9: { high: 82, low: 58 },
        10: { high: 71, low: 46 }, 11: { high: 58, low: 36 }, 12: { high: 45, low: 27 }
    },
    hikes: [
        {
            name: "Green River Bluffs Trail",
            distance: 2.3,
            elevation: 200,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "River views and bluff overlooks"
        },
        {
            name: "Cedar Sink Trail",
            distance: 1.0,
            elevation: 100,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Large sinkhole with cave entrance"
        },
        {
            name: "Historic Tour (Underground)",
            distance: 2.0,
            elevation: 0,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Underground cave tour (54°F year-round)"
        }
    ]
};

parks["Acadia"] = {
    state: "ME",
    coords: [44.3386, -68.2733],
    minDays: 2,
    optimalDays: 3,
    bestMonths: [6, 7, 8, 9, 10],
    highlights: ["Cadillac Mountain", "Jordan Pond", "Thunder Hole", "Bar Harbor"],
    nearbyParks: [],
    avgTemps: {
        1: { high: 31, low: 12 }, 2: { high: 33, low: 14 }, 3: { high: 42, low: 23 },
        4: { high: 53, low: 32 }, 5: { high: 63, low: 42 }, 6: { high: 72, low: 51 },
        7: { high: 77, low: 57 }, 8: { high: 76, low: 56 }, 9: { high: 69, low: 48 },
        10: { high: 58, low: 38 }, 11: { high: 47, low: 29 }, 12: { high: 35, low: 18 }
    },
    hikes: [
        {
            name: "Jordan Pond Path",
            distance: 3.3,
            elevation: 100,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: false,
            description: "Carriage road around pristine lake"
        },
        {
            name: "Ocean Path",
            distance: 4.4,
            elevation: 100,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Paved path along rocky coastline"
        },
        {
            name: "Cadillac Summit Loop",
            distance: 0.3,
            elevation: 50,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "360-degree views from highest East Coast peak"
        }
    ]
};

parks["Everglades"] = {
    state: "FL",
    coords: [25.2866, -80.8987],
    minDays: 2,
    optimalDays: 3,
    bestMonths: [12, 1, 2, 3, 4],
    highlights: ["Anhinga Trail", "Flamingo", "Shark Valley", "Manatee viewing"],
    nearbyParks: [],
    avgTemps: {
        1: { high: 77, low: 53 }, 2: { high: 79, low: 55 }, 3: { high: 83, low: 60 },
        4: { high: 87, low: 66 }, 5: { high: 90, low: 72 }, 6: { high: 91, low: 76 },
        7: { high: 92, low: 77 }, 8: { high: 92, low: 78 }, 9: { high: 90, low: 76 },
        10: { high: 86, low: 70 }, 11: { high: 81, low: 62 }, 12: { high: 78, low: 55 }
    },
    hikes: [
        {
            name: "Anhinga Trail",
            distance: 0.8,
            elevation: 0,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Boardwalk for alligator and bird viewing"
        },
        {
            name: "Gumbo Limbo Trail",
            distance: 0.4,
            elevation: 0,
            difficulty: "easy",
            toddlerFriendly: true,
            strollerFriendly: true,
            description: "Elevated boardwalk through hardwood hammock"
        },
        {
            name: "Shark Valley Tram Road",
            distance: 15.0,
            elevation: 0,
            difficulty: "easy",
            toddlerFriendly: false,
            strollerFriendly: true,
            description: "Paved loop through sawgrass prairie (bike/tram)"
        }
    ]
};