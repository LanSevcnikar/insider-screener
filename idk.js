var SECTOR_CODES = [-1, 1, 10, 15, 20, 40, 50, 52, 60, 70, 0];
var SECTOR_CODES_MAX = [99, 9, 14, 17, 39, 49, 51, 59, 67, 89, 0];
var SECTOR_NAMES = [
  "All Sectors",
  "Agriculture",
  "Basic Materials",
  "Construction",
  "Manufactured Goods",
  "Transportation & Utilities",
  "Wholesale Trade",
  "Retail Trade",
  "Financial",
  "Services",
  "Closed-End Funds",
];

var SUBSECTOR_CODES2 = [
  0, 1, 2, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
  47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
  67, 70, 72, 73, 75, 76, 78, 79, 80, 81, 82, 83, 84, 86, 87, 89,
];

var SUBSECTOR_NAMES2 = [
  "All Subsectors",
  "Crops",
  "Livestock & Animal Specialties",
  "Agricultural Services",
  "Forestry",
  "Fishing, Hunting, & Trapping",
  "Metal Mining",
  "Coal Mining",
  "Oil & Gas Extraction",
  "Mining Nonmetallic Minerals",
  "General Contractors & Builders",
  "Heavy Construction",
  "Special Trade Contractors",
  "Food",
  "Tobacco",
  "Textile Mill Products",
  "Apparel",
  "Lumber",
  "Furniture",
  "Paper",
  "Printing & Publishing",
  "Chemicals",
  "Petroleum Refining",
  "Rubber & Plastic",
  "Leather",
  "Stone, Clay, Glass, & Concrete",
  "Primary Metal",
  "Fabricated Metal Products",
  "Ind Machinery & Computers",
  "Electronics",
  "Transportation Equipment",
  "Specialty Instruments",
  "Miscellaneous Manufacturing",
  "Railroads",
  "Passenger Road Transportation",
  "Road Freight Transportation",
  "USPS",
  "Water Transportation",
  "Air Transportation",
  "Pipelines",
  "Transportation Services",
  "Communications",
  "Electric, Gas, & Sanitary Svcs",
  "Durable Goods",
  "Nondurable Goods",
  "Building Materials",
  "General Merchandise",
  "Grocery",
  "Auto Dealers & Service Stations",
  "Apparel & Accessory Stores",
  "Home Furniture",
  "Eating & Drinking Places",
  "Miscellaneous Retail",
  "Depository Institutions",
  "Non-depository Credit Inst",
  "Security & Commodity Brokers",
  "Insurance Carriers",
  "Insurance Agents",
  "Real Estate",
  "Holding & Investment Offices",
  "Hotels",
  "Personal Services",
  "Business Services",
  "Automotive Repair",
  "Miscellaneous Repair",
  "Motion Pictures",
  "Amusement & Rec Svcs",
  "Health Services",
  "Legal Services",
  "Educational Services",
  "Social Services",
  "Museums",
  "Membership Organizations",
  "Engr, Acct, Rsrch, Mgmt Svcs",
  "Miscellaneous Services",
];

var SUBSECTOR_CODES = [
  [0],
  [0, 1, 2, 7, 8, 9],
  [0, 10, 12, 13, 14],
  [0, 15, 16, 17],
  [
    0, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
    38, 39,
  ],
  [0, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
  [0, 50, 51],
  [0, 52, 53, 54, 55, 56, 57, 58, 59],
  [0, 60, 61, 62, 63, 64, 65, 67],
  [0, 70, 72, 73, 75, 76, 78, 79, 80, 81, 82, 83, 84, 86, 87, 89],
  [0],
];
var SUBSECTOR_NAMES = [
  ["All Subsectors"],
  [
    "All Subsectors",
    "Crops",
    "Livestock & Animal Specialties",
    "Agricultural Services",
    "Forestry",
    "Fishing, Hunting, & Trapping",
  ],
  [
    "All Subsectors",
    "Metal Mining",
    "Coal Mining",
    "Oil & Gas Extraction",
    "Mining Nonmetallic Minerals",
  ],
  [
    "All Subsectors",
    "General Contractors & Builders",
    "Heavy Construction",
    "Special Trade Contractors",
  ],
  [
    "All Subsectors",
    "Food",
    "Tobacco",
    "Textile Mill Products",
    "Apparel",
    "Lumber",
    "Furniture",
    "Paper",
    "Printing & Publishing",
    "Chemicals",
    "Petroleum Refining",
    "Rubber & Plastic",
    "Leather",
    "Stone, Clay, Glass, & Concrete",
    "Primary Metal",
    "Fabricated Metal Products",
    "Ind Machinery & Computers",
    "Electronics",
    "Transportation Equipment",
    "Specialty Instruments",
    "Miscellaneous Manufacturing",
  ],
  [
    "All Subsectors",
    "Railroads",
    "Passenger Road Transportation",
    "Road Freight Transportation",
    "USPS",
    "Water Transportation",
    "Air Transportation",
    "Pipelines",
    "Transportation Services",
    "Communications",
    "Electric, Gas, & Sanitary Svcs",
  ],
  ["All Subsectors", "Durable Goods", "Nondurable Goods"],
  [
    "All Subsectors",
    "Building Materials",
    "General Merchandise",
    "Grocery",
    "Auto Dealers & Service Stations",
    "Apparel & Accessory Stores",
    "Home Furniture",
    "Eating & Drinking Places",
    "Miscellaneous Retail",
  ],
  [
    "All Subsectors",
    "Depository Institutions",
    "Non-depository Credit Inst",
    "Security & Commodity Brokers",
    "Insurance Carriers",
    "Insurance Agents",
    "Real Estate",
    "Holding & Investment Offices",
  ],
  [
    "All Subsectors",
    "Hotels",
    "Personal Services",
    "Business Services",
    "Automotive Repair",
    "Miscellaneous Repair",
    "Motion Pictures",
    "Amusement & Rec Svcs",
    "Health Services",
    "Legal Services",
    "Educational Services",
    "Social Services",
    "Museums",
    "Membership Organizations",
    "Engr, Acct, Rsrch, Mgmt Svcs",
    "Miscellaneous Services",
  ],
  ["All Subsectors"],
];

var INDUSTRY_CODES = [
  0, 100, 200, 700, 800, 900, 1000, 1040, 1090, 1220, 1221, 1311, 1381, 1382,
  1389, 1400, 1520, 1531, 1540, 1600, 1623, 1700, 1731, 2000, 2011, 2013, 2015,
  2020, 2024, 2030, 2033, 2040, 2050, 2052, 2060, 2070, 2080, 2082, 2086, 2090,
  2092, 2100, 2111, 2200, 2211, 2221, 2250, 2253, 2273, 2300, 2320, 2330, 2340,
  2390, 2400, 2421, 2430, 2451, 2452, 2510, 2511, 2520, 2522, 2531, 2540, 2590,
  2600, 2611, 2621, 2631, 2650, 2670, 2673, 2711, 2721, 2731, 2732, 2741, 2750,
  2761, 2771, 2780, 2790, 2800, 2810, 2820, 2821, 2833, 2834, 2835, 2836, 2840,
  2842, 2844, 2851, 2860, 2870, 2890, 2891, 2911, 2950, 2990, 3011, 3021, 3050,
  3060, 3080, 3081, 3086, 3089, 3100, 3140, 3211, 3220, 3221, 3231, 3241, 3250,
  3260, 3270, 3272, 3281, 3290, 3310, 3312, 3317, 3320, 3330, 3334, 3341, 3350,
  3357, 3360, 3390, 3411, 3412, 3420, 3430, 3433, 3440, 3442, 3443, 3444, 3448,
  3451, 3452, 3460, 3470, 3480, 3490, 3510, 3523, 3524, 3530, 3531, 3532, 3533,
  3537, 3540, 3541, 3550, 3555, 3559, 3560, 3561, 3562, 3564, 3567, 3569, 3570,
  3571, 3572, 3575, 3576, 3577, 3578, 3579, 3580, 3585, 3590, 3600, 3612, 3613,
  3620, 3621, 3630, 3634, 3640, 3651, 3652, 3661, 3663, 3669, 3670, 3672, 3674,
  3677, 3678, 3679, 3690, 3695, 3711, 3713, 3714, 3715, 3716, 3720, 3721, 3724,
  3728, 3730, 3743, 3751, 3760, 3790, 3812, 3821, 3822, 3823, 3824, 3825, 3826,
  3827, 3829, 3841, 3842, 3843, 3844, 3845, 3851, 3861, 3873, 3910, 3911, 3931,
  3942, 3944, 3949, 3950, 3960, 3990, 4011, 4013, 4100, 4210, 4213, 4220, 4231,
  4400, 4412, 4512, 4513, 4522, 4581, 4610, 4700, 4731, 4812, 4813, 4822, 4832,
  4833, 4841, 4899, 4900, 4911, 4922, 4923, 4924, 4931, 4932, 4941, 4950, 4953,
  4955, 4961, 4991, 5000, 5010, 5013, 5020, 5030, 5031, 5040, 5045, 5047, 5050,
  5051, 5063, 5064, 5065, 5070, 5072, 5080, 5082, 5084, 5090, 5094, 5099, 5110,
  5122, 5130, 5140, 5141, 5150, 5160, 5171, 5172, 5180, 5190, 5200, 5211, 5271,
  5311, 5331, 5399, 5400, 5411, 5412, 5500, 5531, 5600, 5621, 5651, 5661, 5700,
  5712, 5731, 5734, 5735, 5810, 5812, 5900, 5912, 5940, 5944, 5945, 5960, 5961,
  5990, 6021, 6022, 6029, 6035, 6036, 6099, 6111, 6141, 6153, 6159, 6162, 6163,
  6172, 6189, 6199, 6200, 6211, 6221, 6282, 6311, 6321, 6324, 6331, 6351, 6361,
  6399, 6411, 6500, 6510, 6512, 6513, 6519, 6531, 6532, 6552, 6770, 6792, 6794,
  6795, 6798, 6799, 7000, 7011, 7200, 7310, 7311, 7320, 7330, 7331, 7340, 7350,
  7359, 7361, 7363, 7370, 7371, 7372, 7373, 7374, 7377, 7380, 7381, 7384, 7385,
  7389, 7500, 7510, 7600, 7812, 7819, 7822, 7829, 7830, 7841, 7900, 7948, 7990,
  7997, 8000, 8011, 8050, 8051, 8060, 8062, 8071, 8082, 8090, 8093, 8111, 8200,
  8300, 8351, 8600, 8700, 8711, 8731, 8734, 8741, 8742, 8744, 8880, 8888, 8900,
  9721, 9995,
];
var INDUSTRY_NAMES = [
  "All Industries",
  "Crops",
  "Livestock & Animal Specialties",
  "Agricultural Services",
  "Forestry",
  "Fishing, Hunting & Trapping",
  "Metal Mining",
  "Gold & Silver Ores",
  "Miscellaneous Metal Ores",
  "Bituminous Coal & Lignite Mining",
  "Bituminous Coal & Lignite Surface Mining",
  "Crude Petroleum & Natural Gas",
  "Drilling Oil & Gas Wells",
  "Oil & Gas Field Exploration Services",
  "Oil & Gas Field Services",
  "Mining & Quarrying of Nonmetallic Minerals",
  "Residential Bldg Contractors",
  "Operative Builders",
  "Nonresidential Bldg Contractors",
  "Heavy Construction Non-Bldg Contractors",
  "Water, Sewer, Pipeline, Comm & Power Line Construction",
  "Special Trade Contractors",
  "Electrical Work",
  "Food & Kindred Products",
  "Meat Packing Plants",
  "Sausages & Other Prepared Meat Products",
  "Poultry Slaughtering & Processing",
  "Dairy Products",
  "Ice Cream & Frozen Desserts",
  "Canned, Frozen & Preservd Fruit, Veg & Food Specialties",
  "Canned, Fruits, Veg, Preserves, Jams & Jellies",
  "Grain Mill Products",
  "Bakery Products",
  "Cookies & Crackers",
  "Sugar & Confectionery Products",
  "Fats & Oils",
  "Beverages",
  "Malt Beverages",
  "Bottled & Canned Soft Drinks & Carbonated Waters",
  "Miscellaneous Food Preparations & Kindred Products",
  "Prepared Fresh or Frozen Fish & Seafoods",
  "Tobacco Products",
  "Cigarettes",
  "Textile Mill Products",
  "Broadwoven Fabric Mills, Cotton",
  "Broadwoven Fabric Mills, Man Made Fiber & Silk",
  "Knitting Mills",
  "Knit Outerwear Mills",
  "Carpets & Rugs",
  "Apparel & Other Finishd Prods of Fabrics & Similar Matl",
  "Men's & Boys' Furnishgs, Work Clothg, & Allied Garments",
  "Women's, Misses', & Juniors Outerwear",
  "Women's, Misses', Children's & Infants' Undergarments",
  "Miscellaneous Fabricated Textile Products",
  "Lumber & Wood Products (No Furniture)",
  "Sawmills & Planting Mills, General",
  "Millwood, Veneer, Plywood, & Structural Wood Members",
  "Mobile Homes",
  "Prefabricated Wood Bldgs & Components",
  "Household Furniture",
  "Wood Household Furniture, (No Upholstered)",
  "Office Furniture",
  "Office Furniture (No Wood)",
  "Public Bldg & Related Furniture",
  "Partitions, Shelvg, Lockers, & Office & Store Fixtures",
  "Miscellaneous Furniture & Fixtures",
  "Papers & Allied Products",
  "Pulp Mills",
  "Paper Mills",
  "Paperboard Mills",
  "Paperboard Containers & Boxes",
  "Converted Paper & Paperboard Prods (No Contaners/Boxes)",
  "Plastics, Foil & Coated Paper Bags",
  "Newspapers: Publishing or Publishing & Printing",
  "Periodicals: Publishing or Publishing & Printing",
  "Books: Publishing or Publishing & Printing",
  "Book Printing",
  "Miscellaneous Publishing",
  "Commercial Printing",
  "Manifold Business Forms",
  "Greeting Cards",
  "Blankbooks, Looseleaf Binders & Bookbindg & Relatd Work",
  "Service Industries For The Printing Trade",
  "Chemicals & Allied Products",
  "Industrial Inorganic Chemicals",
  "Plastic Material, Synth Resin/Rubber, Cellulos (No Glass)",
  "Plastic Materials, Synth Resins & Nonvulcan Elastomers",
  "Medicinal Chemicals & Botanical Products",
  "Pharmaceutical Preparations",
  "In Vitro & In Vivo Diagnostic Substances",
  "Biological Products, (No Diagnostic Substances)",
  "Soap, Detergents, Cleaning, Perfumes, Cosmetics",
  "Specialty Cleaning, Polishing & Sanitation Preparations",
  "Perfumes, Cosmetics & Other Toilet Preparations",
  "Paints, Varnishes, Lacquers, Enamels",
  "Industrial Organic Chemicals",
  "Agricultural Chemicals",
  "Miscellaneous Chemical Products",
  "Adhesives & Sealants",
  "Petroleum Refining",
  "Asphalt Paving & Roofing Materials",
  "Miscellaneous Products of Petroleum & Coal",
  "Tires & Inner Tubes",
  "Rubber & Plastics Footwear",
  "Gaskets, Packg & Sealg Devices & Rubber & Plastics Hose",
  "Fabricated Rubber Products",
  "Miscellaneous Plastics Products",
  "Unsupported Plastics Film & Sheet",
  "Plastics Foam Products",
  "Plastics Products",
  "Leather & Leather Products",
  "Footwear, (No Rubber)",
  "Flat Glass",
  "Glass & Glassware, Pressed or Blown",
  "Glass Containers",
  "Glass Products, Made of Purchased Glass",
  "Cement, Hydraulic",
  "Structural Clay Products",
  "Pottery & Related Products",
  "Concrete, Gypsum & Plaster Products",
  "Concrete Products, Except Block & Brick",
  "Cut Stone & Stone Products",
  "Abrasive, Asbestos & Misc Nonmetallic Mineral Prods",
  "Steel Works, Blast Furnaces & Rolling & Finishing Mills",
  "Steel Works, Blast Furnaces & Rolling Mills (Coke Ovens)",
  "Steel Pipe & Tubes",
  "Iron & Steel Foundries",
  "Primary Smelting & Refining of Nonferrous Metals",
  "Primary Production of Aluminum",
  "Secondary Smelting & Refining of Nonferrous Metals",
  "Rolling Drawing & Extruding of Nonferrous Metals",
  "Drawing & Insulating of Nonferrous Wire",
  "Nonferrous Foundries (Castings)",
  "Miscellaneous Primary Metal Products",
  "Metal Cans",
  "Metal Shipping Barrels, Drums, Kegs & Pails",
  "Cutlery, Handtools & General Hardware",
  "Hearing Equip, Except Elec & Warm Air; & Plumbing Fixtures",
  "Heating Equipment, Except Electric & Warm Air Furnaces",
  "Fabricated Structural Metal Products",
  "Metal Doors, Sash, Frames, Moldings & Trim",
  "Fabricated Plate Work (Boiler Shops)",
  "Sheet Metal Work",
  "Prefabricated Metal Buildings & Components",
  "Screw Machine Products",
  "Bolts, Nuts, Screws, Rivets & Washers",
  "Metal Forgings & Stampings",
  "Coating, Engraving & Allied Services",
  "Ordnance & Accessories, (No Vehicles/Guided Missiles)",
  "Miscellaneous Fabricated Metal Products",
  "Engines & Turbines",
  "Farm Machinery & Equipment",
  "Lawn & Garden Tractors & Home Lawn & Gardens Equip",
  "Construction, Mining & Materials Handling Machinery & Equip",
  "Construction Machinery & Equip",
  "Mining Machinery & Equip (No Oil & Gas Field Mach & Equip)",
  "Oil & Gas Field Machinery & Equipment",
  "Industrial Trucks, Tractors, Trailors & Stackers",
  "Metalworkg Machinery & Equipment",
  "Machine Tools, Metal Cutting Types",
  "Special Industry Machinery (No Metalworking Machinery)",
  "Printing Trades Machinery & Equipment",
  "Special Industry Machinery",
  "General Industrial Machinery & Equipment",
  "Pumps & Pumping Equipment",
  "Ball & Roller Bearings",
  "Industrial & Commercial Fans & Blowers & Air Purifing Equip",
  "Industrial Process Furnaces & Ovens",
  "General Industrial Machinery & Equipment",
  "Computer & Office Equipment",
  "Electronic Computers",
  "Computer Storage Devices",
  "Computer Terminals",
  "Computer Communications Equipment",
  "Computer Peripheral Equipment",
  "Calculating & Accounting Machines (No Electronic Computers)",
  "Office Machines",
  "Refrigeration & Service Industry Machinery",
  "Air-Cond & Warm Air Heatg Equip & Comm & Indl Refrig Equip",
  "Misc Industrial & Commercial Machinery & Equipment",
  "Electronic & Other Electrical Equipment (No Computer Equip)",
  "Power, Distribution & Specialty Transformers",
  "Switchgear & Switchboard Apparatus",
  "Electrical Industrial Apparatus",
  "Motors & Generators",
  "Household Appliances",
  "Electric Housewares & Fans",
  "Electric Lighting & Wiring Equipment",
  "Household Audio & Video Equipment",
  "Phonograph Records & Prerecorded Audio Tapes & Disks",
  "Telephone & Telegraph Apparatus",
  "Radio & Tv Broadcasting & Communications Equipment",
  "Communications Equipment",
  "Electronic Components & Accessories",
  "Printed Circuit Boards",
  "Semiconductors & Related Devices",
  "Electronic Coils, Transformers & Other Inductors",
  "Electronic Connectors",
  "Electronic Components",
  "Miscellaneous Electrical Machinery, Equipment & Supplies",
  "Magnetic & Optical Recording Media",
  "Motor Vehicles & Passenger Car Bodies",
  "Truck & Bus Bodies",
  "Motor Vehicle Parts & Accessories",
  "Truck Trailers",
  "Motor Homes",
  "Aircraft & Parts",
  "Aircraft",
  "Aircraft Engines & Engine Parts",
  "Aircraft Parts & Auxiliary Equipment",
  "Ship & Boat Building & Repairing",
  "Railroad Equipment",
  "Motorcycles, Bicycles & Parts",
  "Guided Missiles & Space Vehicles & Parts",
  "Miscellaneous Transportation Equipment",
  "Search, Detection, Navagation, Guidance, Aeronautical Sys",
  "Laboratory Apparatus & Furniture",
  "Auto Controls For Regulating Residential & Comml Environments",
  "Industrial Instruments For Measurement, Display, & Control",
  "Totalizing Fluid Meters & Counting Devices",
  "Instruments For Meas & Testing of Electricity & Elec Signals",
  "Laboratory Analytical Instruments",
  "Optical Instruments & Lenses",
  "Measuring & Controlling Devices",
  "Surgical & Medical Instruments & Apparatus",
  "Orthopedic, Prosthetic & Surgical Appliances & Supplies",
  "Dental Equipment & Supplies",
  "X-Ray Apparatus & Tubes & Related Irradiation Apparatus",
  "Electromedical & Electrotherapeutic Apparatus",
  "Ophthalmic Goods",
  "Photographic Equipment & Supplies",
  "Watches, Clocks, Clockwork Operated Devices/Parts",
  "Jewelry, Silverware & Plated Ware",
  "Jewelry, Precious Metal",
  "Musical Instruments",
  "Dolls & Stuffed Toys",
  "Games, Toys & Children's Vehicles (No Dolls & Bicycles)",
  "Sporting & Athletic Goods",
  "Pens, Pencils & Other Artists' Materials",
  "Costume Jewelry & Novelties",
  "Miscellaneous Manufacturing Industries",
  "Railroads, Line-Haul Operating",
  "Railroad Switching & Terminal Establishments",
  "Local & Suburban Transit & Interurban Hwy Passenger Trans",
  "Trucking & Courier Services (No Air)",
  "Trucking (No Local)",
  "Public Warehousing & Storage",
  "Terminal Maintenance Facilities For Motor Freight Transport",
  "Water Transportation",
  "Deep Sea Foreign Transportation of Freight",
  "Air Transportation, Scheduled",
  "Air Courier Services",
  "Air Transportation, Nonscheduled",
  "Airports, Flying Fields & Airport Terminal Services",
  "Pipe Lines (No Natural Gas)",
  "Transportation Services",
  "Arrangement of Transportation of Freight & Cargo",
  "Radiotelephone Communications",
  "Telephone Communications (No Radiotelephone)",
  "Telegraph & Other Message Communications",
  "Radio Broadcasting Stations",
  "Television Broadcasting Stations",
  "Cable & Other Pay Television Services",
  "Communications Services",
  "Electric, Gas & Sanitary Services",
  "Electric Services",
  "Natural Gas Transmission",
  "Natural Gas Transmisison & Distribution",
  "Natural Gas Distribution",
  "Electric & Other Services Combined",
  "Gas & Other Services Combined",
  "Water Supply",
  "Sanitary Services",
  "Refuse Systems",
  "Hazardous Waste Management",
  "Steam & Air-Conditioning Supply",
  "Cogeneration Services & Small Power Producers",
  "Durable Goods",
  "Motor Vehicles & Motor Vehicle Parts & Supplies",
  "Motor Vehicle Supplies & New Parts",
  "Furniture & Home Furnishings",
  "Lumber & Other Construction Materials",
  "Lumber, Plywood, Millwork & Wood Panels",
  "Professional & Commercial Equipment & Supplies",
  "Computers & Peripheral Equipment & Software",
  "Medical, Dental & Hospital Equipment & Supplies",
  "Metals & Minerals (No Petroleum)",
  "Metals Service Centers & Offices",
  "Electrical Apparatus & Equipment, Wiring Supplies",
  "Electrical Appliances, Tv & Radio Sets",
  "Electronic Parts & Equipment",
  "Hardware & Plumbing & Heating Equipment & Supplies",
  "Hardware",
  "Machinery, Equipment & Supplies",
  "Construction & Mining (No Petro) Machinery & Equip",
  "Industrial Machinery & Equipment",
  "Misc Durable Goods",
  "Jewelry, Watches, Precious Stones & Metals",
  "Durable Goods",
  "Paper & Paper Products",
  "Drugs, Proprietaries & Druggists' Sundries",
  "Apparel, Piece Goods & Notions",
  "Groceries & Related Products",
  "Groceries, General Line",
  "Farm Product Raw Materials",
  "Chemicals & Allied Products",
  "Petroleum Bulk Stations & Terminals",
  "Petroleum & Petroleum Products (No Bulk Stations)",
  "Beer, Wine & Distilled Alcoholic Beverages",
  "Miscellaneous Nondurable Goods",
  "Building Materials, Hardware, Garden Supply",
  "Lumber & Other Building Materials Dealers",
  "Mobile Home Dealers",
  "Department Stores",
  "Variety Stores",
  "Misc General Merchandise Stores",
  "Food Stores",
  "Grocery Stores",
  "Convenience Stores",
  "Auto Dealers & Gasoline Stations",
  "Auto & Home Supply Stores",
  "Apparel & Accessory Stores",
  "Women's Clothing Stores",
  "Family Clothing Stores",
  "Shoe Stores",
  "Home Furniture, Furnishings & Equipment Stores",
  "Furniture Stores",
  "Radio, Tv & Consumer Electronics Stores",
  "Computer & Computer Software Stores",
  "Record & Prerecorded Tape Stores",
  "Eating & Drinking Places",
  "Eating Places",
  "Miscellaneous Retail",
  "Drug Stores & Proprietary Stores",
  "Miscellaneous Shopping Goods Stores",
  "Jewelry Stores",
  "Hobby, Toy & Game Shops",
  "Nonstore Retailers",
  "Catalog & Mail-Order Houses",
  "Retail Stores",
  "National Commercial Banks",
  "State Commercial Banks",
  "Commercial Banks",
  "Savings Institution, Federally Chartered",
  "Savings Institutions, Not Federally Chartered",
  "Functions Related to Depository Banking",
  "Federal & Federally-Sponsored Credit Agencies",
  "Personal Credit Institutions",
  "Short-Term Business Credit Institutions",
  "Miscellaneous Business Credit Institution",
  "Mortgage Bankers & Loan Correspondents",
  "Loan Brokers",
  "Finance Lessors",
  "Asset-Backed Securities",
  "Finance Services",
  "Security & Commodity Brokers, Dealers, Exchanges & Services",
  "Security Brokers, Dealers & Flotation Companies",
  "Commodity Contracts Brokers & Dealers",
  "Investment Advice",
  "Life Insurance",
  "Accident & Health Insurance",
  "Hospital & Medical Service Plans",
  "Fire, Marine & Casualty Insurance",
  "Surety Insurance",
  "Title Insurance",
  "Insurance Carriers",
  "Insurance Agents, Brokers & Service",
  "Real Estate",
  "Real Estate Operators (No Developers) & Lessors",
  "Operators of Nonresidential Buildings",
  "Operators of Apartment Buildings",
  "Lessors of Real Property",
  "Real Estate Agents & Managers (For Others)",
  "Real Estate Dealers (For Their Own Account)",
  "Land Subdividers & Developers (No Cemeteries)",
  "Blank Checks",
  "Oil Royalty Traders",
  "Patent Owners & Lessors",
  "Mineral Royalty Traders",
  "Real Estate Investment Trusts",
  "Investors",
  "Hotels, Rooming Houses, Camps & Other Lodging Places",
  "Hotels & Motels",
  "Personal Services",
  "Advertising",
  "Advertising Agencies",
  "Consumer Credit Reporting, Collection Agencies",
  "Mailing, Reproduction, Commercial Art & Photography",
  "Direct Mail Advertising Services",
  "To Dwellings & Other Buildings",
  "Miscellaneous Equipment Rental & Leasing",
  "Equipment Rental & Leasing",
  "Employment Agencies",
  "Help Supply Services",
  "Computer Programming, Data Processing, Etc.",
  "Computer Programming Services",
  "Prepackaged Software",
  "Computer Integrated Systems Design",
  "Computer Processing & Data Preparation",
  "Computer Rental & Leasing",
  "Miscellaneous Business Services",
  "Detective, Guard & Armored Car Services",
  "Photofinishing Laboratories",
  "Telephone Interconnect Systems",
  "Business Services",
  "Automotive Repair, Services & Parking",
  "Auto Rental & Leasing (No Drivers)",
  "Miscellaneous Repair Services",
  "Motion Picture & Video Tape Production",
  "Allied to Motion Picture Production",
  "Motion Picture & Video Tape Distribution",
  "Allied to Motion Picture Distribution",
  "Motion Picture Theaters",
  "Video Tape Rental",
  "Amusement & Recreation Services",
  "Racing, Including Track Operation",
  "Miscellaneous Amusement & Recreation",
  "Membership Sports & Recreation Clubs",
  "Health Services",
  "Offices & Clinics of Doctors of Medicine",
  "Nursing & Personal Care Facilities",
  "Skilled Nursing Care Facilities",
  "Hospitals",
  "General Medical & Surgical Hospitals",
  "Medical Laboratories",
  "Home Health Care Services",
  "Misc Health & Allied Services",
  "Specialty Outpatient Facilities",
  "Legal Services",
  "Educational Services",
  "Social Services",
  "Child Day Care Services",
  "Membership Organizations",
  "Engineering, Accounting, Research, Management",
  "Engineering Services",
  "Commercial Physical & Biological Research",
  "Testing Laboratories",
  "Management Services",
  "Management Consulting Services",
  "Facilities Support Management Services",
  "American Depositary Receipts",
  "Foreign Governments",
  "Services",
  "International Affairs",
  "Non-Operating Establishments",
];

function changeSelect(fieldID, newOptions, newValues) {
  selectField = document.getElementById(fieldID);
  selectField.options.length = 0;
  for (i = 0; i < newOptions.length; i++) {
    selectField.options[selectField.length] = new Option(
      newOptions[i].substring(0, 32),
      newValues[i]
    );
  }
}

function setSubsectors(defaultVal, defaultVal2) {
  sec = parseInt(document.getElementById("sector").value, 10);
  var ix = SECTOR_CODES.indexOf(sec);
  subsectorList = SUBSECTOR_NAMES[ix];
  changeSelect("subsector", subsectorList, SUBSECTOR_CODES[ix]);
  if (typeof defaultVal !== "undefined")
    document.getElementById("subsector").value = defaultVal;
  setIndustries(defaultVal2);
  document.getElementById("subsector").disabled =
    subsectorList.length == 1 ? true : false;
}

function setIndustries(defaultVal) {
  sub = 100 * parseInt(document.getElementById("subsector").value, 10);
  lo = 0;
  hi = null;
  for (i = 0; i < INDUSTRY_CODES.length; i++) {
    if (INDUSTRY_CODES[i] >= sub && lo == 0) {
      lo = i;
    }
    if (INDUSTRY_CODES[i] - 100 >= sub) {
      hi = i;
      break;
    }
  }
  var industryList = INDUSTRY_NAMES.slice(lo, hi);
  var industryCodes = INDUSTRY_CODES.slice(lo, hi);
  if (industryCodes.length != 1) {
    industryList.unshift("All Industries");
    industryCodes.unshift(0);
  }
  changeSelect("industry", industryList, industryCodes);
  if (typeof defaultVal !== "undefined")
    document.getElementById("industry").value = defaultVal;
  setSicMinMax();
  document.getElementById("industry").disabled =
    industryList.length == 1 ? true : false;
}

function setSicMinMax() {
  ind = parseInt(document.getElementById("industry").value, 10);
  if (ind > 0) {
    sicMin = ind;
    i = INDUSTRY_CODES.indexOf(ind) + 1;
    sicMax = i == INDUSTRY_CODES.length ? 9999 : INDUSTRY_CODES[i] - 1;
  } else {
    sub = parseInt(document.getElementById("subsector").value, 10);
    if (sub > 0) {
      sicMin = 100 * sub;
      sicMax = 100 * SUBSECTOR_CODES2[SUBSECTOR_CODES2.indexOf(sub) + 1] - 1;
    } else {
      sec = parseInt(document.getElementById("sector").value, 10);
      sicMin = sec == -1 ? 100 : 100 * sec;
      sicMax = 99 + 100 * SECTOR_CODES_MAX[SECTOR_CODES.indexOf(sec)];
    }
  }
  document.getElementById("sicMin").value = sicMin;
  document.getElementById("sicMax").value = sicMax;
}

function getVar(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return null;
}

function initDropDown(variable) {
  var sic = variable; //getVar("sicl");
  var sub = Math.floor(sic / 100);

  setSubsectors(sub, sic);
}
