using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace University_Admission.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    DialCode = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Universities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    CountryId = table.Column<int>(type: "integer", nullable: false),
                    AddressLine1 = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    AddressLine2 = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    WebSite = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Universities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Universities_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    PassportNo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    NationalityId = table.Column<int>(type: "integer", nullable: false),
                    Gender = table.Column<int>(type: "integer", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PasswordHash = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Countries_NationalityId",
                        column: x => x.NationalityId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UniversityPrograms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UniversityId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Level = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Fee = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UniversityPrograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UniversityPrograms_Universities_UniversityId",
                        column: x => x.UniversityId,
                        principalTable: "Universities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Announcements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EntryById = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Title = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Description = table.Column<string>(type: "character varying(5000)", maxLength: 5000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Announcements_Users_EntryById",
                        column: x => x.EntryById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Description = table.Column<string>(type: "character varying(5000)", maxLength: 5000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notification_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProgramRequirements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UniversityProgramId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsMandatory = table.Column<bool>(type: "boolean", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramRequirements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgramRequirements_UniversityPrograms_UniversityProgramId",
                        column: x => x.UniversityProgramId,
                        principalTable: "UniversityPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProgramProcesses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    UniversityId = table.Column<int>(type: "integer", nullable: false),
                    UniversityProgramId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProgramProcesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProgramProcesses_Universities_UniversityId",
                        column: x => x.UniversityId,
                        principalTable: "Universities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProgramProcesses_UniversityPrograms_UniversityProgramId",
                        column: x => x.UniversityProgramId,
                        principalTable: "UniversityPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProgramProcesses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProgramRequirements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProgramProcessId = table.Column<int>(type: "integer", nullable: false),
                    ProgramRequirementId = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProgramRequirements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProgramRequirements_ProgramRequirements_ProgramRequirem~",
                        column: x => x.ProgramRequirementId,
                        principalTable: "ProgramRequirements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProgramRequirements_UserProgramProcesses_UserProgramPro~",
                        column: x => x.UserProgramProcessId,
                        principalTable: "UserProgramProcesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Code", "DialCode", "Name" },
                values: new object[,]
                {
                    { 1, "AFG", "93", "Afghanistan" },
                    { 2, "ALB", "355", "Albania" },
                    { 3, "DZA", "213", "Algeria" },
                    { 4, "ASM", "1-684", "American Samoa" },
                    { 5, "AND", "376", "Andorra" },
                    { 6, "AGO", "244", "Angola" },
                    { 7, "AIA", "1-264", "Anguilla" },
                    { 8, "ATA", "672", "Antarctica" },
                    { 9, "ATG", "1-268", "Antigua and Barbuda" },
                    { 10, "ARG", "54", "Argentina" },
                    { 11, "ARM", "374", "Armenia" },
                    { 12, "ABW", "297", "Aruba" },
                    { 13, "AUS", "61", "Australia" },
                    { 14, "AUT", "43", "Austria" },
                    { 15, "AZE", "994", "Azerbaijan" },
                    { 16, "BHS", "1-242", "Bahamas" },
                    { 17, "BHR", "973", "Bahrain" },
                    { 18, "BGD", "880", "Bangladesh" },
                    { 19, "BRB", "1-246", "Barbados" },
                    { 20, "BLR", "375", "Belarus" },
                    { 21, "BEL", "32", "Belgium" },
                    { 22, "BLZ", "501", "Belize" },
                    { 23, "BEN", "229", "Benin" },
                    { 24, "BMU", "1-441", "Bermuda" },
                    { 25, "BTN", "975", "Bhutan" },
                    { 26, "BOL", "591", "Bolivia" },
                    { 27, "BIH", "387", "Bosnia and Herzegovina" },
                    { 28, "BWA", "267", "Botswana" },
                    { 29, "BRA", "55", "Brazil" },
                    { 30, "IOT", "246", "British Indian Ocean Territory" },
                    { 31, "VGB", "1-284", "British Virgin Islands" },
                    { 32, "BRN", "673", "Brunei" },
                    { 33, "BGR", "359", "Bulgaria" },
                    { 34, "BFA", "226", "Burkina Faso" },
                    { 35, "BDI", "257", "Burundi" },
                    { 36, "KHM", "855", "Cambodia" },
                    { 37, "CMR", "237", "Cameroon" },
                    { 38, "CAN", "1", "Canada" },
                    { 39, "CPV", "238", "Cape Verde" },
                    { 40, "CYM", "1-345", "Cayman Islands" },
                    { 41, "CAF", "236", "Central African Republic" },
                    { 42, "TCD", "235", "Chad" },
                    { 43, "CHL", "56", "Chile" },
                    { 44, "CHN", "86", "China" },
                    { 45, "CXR", "61", "Christmas Island" },
                    { 46, "CCK", "61", "Cocos Islands" },
                    { 47, "COL", "57", "Colombia" },
                    { 48, "COM", "269", "Comoros" },
                    { 49, "COK", "682", "Cook Islands" },
                    { 50, "CRI", "506", "Costa Rica" },
                    { 51, "HRV", "385", "Croatia" },
                    { 52, "CUB", "53", "Cuba" },
                    { 53, "CUW", "599", "Curacao" },
                    { 54, "CYP", "357", "Cyprus" },
                    { 55, "CZE", "420", "Czech Republic" },
                    { 56, "COD", "243", "Democratic Republic of the Congo" },
                    { 57, "DNK", "45", "Denmark" },
                    { 58, "DJI", "253", "Djibouti" },
                    { 59, "DMA", "1-767", "Dominica" },
                    { 60, "DOM", "1-809, 1-829, 1-849", "Dominican Republic" },
                    { 61, "TLS", "670", "East Timor" },
                    { 62, "ECU", "593", "Ecuador" },
                    { 63, "EGY", "20", "Egypt" },
                    { 64, "SLV", "503", "El Salvador" },
                    { 65, "GNQ", "240", "Equatorial Guinea" },
                    { 66, "ERI", "291", "Eritrea" },
                    { 67, "EST", "372", "Estonia" },
                    { 68, "ETH", "251", "Ethiopia" },
                    { 69, "FLK", "500", "Falkland Islands" },
                    { 70, "FRO", "298", "Faroe Islands" },
                    { 71, "FJI", "679", "Fiji" },
                    { 72, "FIN", "358", "Finland" },
                    { 73, "FRA", "33", "France" },
                    { 74, "PYF", "689", "French Polynesia" },
                    { 75, "GAB", "241", "Gabon" },
                    { 76, "GMB", "220", "Gambia" },
                    { 77, "GEO", "995", "Georgia" },
                    { 78, "DEU", "49", "Germany" },
                    { 79, "GHA", "233", "Ghana" },
                    { 80, "GIB", "350", "Gibraltar" },
                    { 81, "GRC", "30", "Greece" },
                    { 82, "GRL", "299", "Greenland" },
                    { 83, "GRD", "1-473", "Grenada" },
                    { 84, "GUM", "1-671", "Guam" },
                    { 85, "GTM", "502", "Guatemala" },
                    { 86, "GGY", "44-1481", "Guernsey" },
                    { 87, "GIN", "224", "Guinea" },
                    { 88, "GNB", "245", "Guinea-Bissau" },
                    { 89, "GUY", "592", "Guyana" },
                    { 90, "HTI", "509", "Haiti" },
                    { 91, "HND", "504", "Honduras" },
                    { 92, "HKG", "852", "Hong Kong" },
                    { 93, "HUN", "36", "Hungary" },
                    { 94, "ISL", "354", "Iceland" },
                    { 95, "IND", "91", "India" },
                    { 96, "IDN", "62", "Indonesia" },
                    { 97, "IRN", "98", "Iran" },
                    { 98, "IRQ", "964", "Iraq" },
                    { 99, "IRL", "353", "Ireland" },
                    { 100, "IMN", "44-1624", "Isle of Man" },
                    { 101, "ISR", "972", "Israel" },
                    { 102, "ITA", "39", "Italy" },
                    { 103, "CIV", "225", "Ivory Coast" },
                    { 104, "JAM", "1-876", "Jamaica" },
                    { 105, "JPN", "81", "Japan" },
                    { 106, "JEY", "44-1534", "Jersey" },
                    { 107, "JOR", "962", "Jordan" },
                    { 108, "KAZ", "7", "Kazakhstan" },
                    { 109, "KEN", "254", "Kenya" },
                    { 110, "KIR", "686", "Kiribati" },
                    { 111, "XKX", "383", "Kosovo" },
                    { 112, "KWT", "965", "Kuwait" },
                    { 113, "KGZ", "996", "Kyrgyzstan" },
                    { 114, "LAO", "856", "Laos" },
                    { 115, "LVA", "371", "Latvia" },
                    { 116, "LBN", "961", "Lebanon" },
                    { 117, "LSO", "266", "Lesotho" },
                    { 118, "LBR", "231", "Liberia" },
                    { 119, "LBY", "218", "Libya" },
                    { 120, "LIE", "423", "Liechtenstein" },
                    { 121, "LTU", "370", "Lithuania" },
                    { 122, "LUX", "352", "Luxembourg" },
                    { 123, "MAC", "853", "Macau" },
                    { 124, "MKD", "389", "Macedonia" },
                    { 125, "MDG", "261", "Madagascar" },
                    { 126, "MWI", "265", "Malawi" },
                    { 127, "MYS", "60", "Malaysia" },
                    { 128, "MDV", "960", "Maldives" },
                    { 129, "MLI", "223", "Mali" },
                    { 130, "MLT", "356", "Malta" },
                    { 131, "MHL", "692", "Marshall Islands" },
                    { 132, "MRT", "222", "Mauritania" },
                    { 133, "MUS", "230", "Mauritius" },
                    { 134, "MYT", "262", "Mayotte" },
                    { 135, "MEX", "52", "Mexico" },
                    { 136, "FSM", "691", "Micronesia" },
                    { 137, "MDA", "373", "Moldova" },
                    { 138, "MCO", "377", "Monaco" },
                    { 139, "MNG", "976", "Mongolia" },
                    { 140, "MNE", "382", "Montenegro" },
                    { 141, "MSR", "1-664", "Montserrat" },
                    { 142, "MAR", "212", "Morocco" },
                    { 143, "MOZ", "258", "Mozambique" },
                    { 144, "MMR", "95", "Myanmar" },
                    { 145, "NAM", "264", "Namibia" },
                    { 146, "NRU", "674", "Nauru" },
                    { 147, "NPL", "977", "Nepal" },
                    { 148, "NLD", "31", "Netherlands" },
                    { 149, "ANT", "599", "Netherlands Antilles" },
                    { 150, "NCL", "687", "New Caledonia" },
                    { 151, "NZL", "64", "New Zealand" },
                    { 152, "NIC", "505", "Nicaragua" },
                    { 153, "NER", "227", "Niger" },
                    { 154, "NGA", "234", "Nigeria" },
                    { 155, "NIU", "683", "Niue" },
                    { 156, "PRK", "850", "North Korea" },
                    { 157, "MNP", "1-670", "Northern Mariana Islands" },
                    { 158, "NOR", "47", "Norway" },
                    { 159, "OMN", "968", "Oman" },
                    { 160, "PAK", "92", "Pakistan" },
                    { 161, "PLW", "680", "Palau" },
                    { 162, "PSE", "970", "Palestine" },
                    { 163, "PAN", "507", "Panama" },
                    { 164, "PNG", "675", "Papua New Guinea" },
                    { 165, "PRY", "595", "Paraguay" },
                    { 166, "PER", "51", "Peru" },
                    { 167, "PHL", "63", "Philippines" },
                    { 168, "PCN", "64", "Pitcairn" },
                    { 169, "POL", "48", "Poland" },
                    { 170, "PRT", "351", "Portugal" },
                    { 171, "PRI", "1-787, 1-939", "Puerto Rico" },
                    { 172, "QAT", "974", "Qatar" },
                    { 173, "COG", "242", "Republic of the Congo" },
                    { 174, "REU", "262", "Reunion" },
                    { 175, "ROU", "40", "Romania" },
                    { 176, "RUS", "7", "Russia" },
                    { 177, "RWA", "250", "Rwanda" },
                    { 178, "BLM", "590", "Saint Barthelemy" },
                    { 179, "SHN", "290", "Saint Helena" },
                    { 180, "KNA", "1-869", "Saint Kitts and Nevis" },
                    { 181, "LCA", "1-758", "Saint Lucia" },
                    { 182, "MAF", "590", "Saint Martin" },
                    { 183, "SPM", "508", "Saint Pierre and Miquelon" },
                    { 184, "VCT", "1-784", "Saint Vincent and the Grenadines" },
                    { 185, "WSM", "685", "Samoa" },
                    { 186, "SMR", "378", "San Marino" },
                    { 187, "STP", "239", "Sao Tome and Principe" },
                    { 188, "SAU", "966", "Saudi Arabia" },
                    { 189, "SEN", "221", "Senegal" },
                    { 190, "SRB", "381", "Serbia" },
                    { 191, "SYC", "248", "Seychelles" },
                    { 192, "SLE", "232", "Sierra Leone" },
                    { 193, "SGP", "65", "Singapore" },
                    { 194, "SXM", "1-721", "Sint Maarten" },
                    { 195, "SVK", "421", "Slovakia" },
                    { 196, "SVN", "386", "Slovenia" },
                    { 197, "SLB", "677", "Solomon Islands" },
                    { 198, "SOM", "252", "Somalia" },
                    { 199, "ZAF", "27", "South Africa" },
                    { 200, "KOR", "82", "South Korea" },
                    { 201, "SSD", "211", "South Sudan" },
                    { 202, "ESP", "34", "Spain" },
                    { 203, "LKA", "94", "Sri Lanka" },
                    { 204, "SDN", "249", "Sudan" },
                    { 205, "SUR", "597", "Suriname" },
                    { 206, "SJM", "47", "Svalbard and Jan Mayen" },
                    { 207, "SWZ", "268", "Swaziland" },
                    { 208, "SWE", "46", "Sweden" },
                    { 209, "CHE", "41", "Switzerland" },
                    { 210, "SYR", "963", "Syria" },
                    { 211, "TWN", "886", "Taiwan" },
                    { 212, "TJK", "992", "Tajikistan" },
                    { 213, "TZA", "255", "Tanzania" },
                    { 214, "THA", "66", "Thailand" },
                    { 215, "TGO", "228", "Togo" },
                    { 216, "TKL", "690", "Tokelau" },
                    { 217, "TON", "676", "Tonga" },
                    { 218, "TTO", "1-868", "Trinidad and Tobago" },
                    { 219, "TUN", "216", "Tunisia" },
                    { 220, "TUR", "90", "Turkey" },
                    { 221, "TKM", "993", "Turkmenistan" },
                    { 222, "TCA", "1-649", "Turks and Caicos Islands" },
                    { 223, "TUV", "688", "Tuvalu" },
                    { 224, "VIR", "1-340", "U.S. Virgin Islands" },
                    { 225, "UGA", "256", "Uganda" },
                    { 226, "UKR", "380", "Ukraine" },
                    { 227, "ARE", "971", "United Arab Emirates" },
                    { 228, "GBR", "44", "United Kingdom" },
                    { 229, "USA", "1", "United States" },
                    { 230, "URY", "598", "Uruguay" },
                    { 231, "UZB", "998", "Uzbekistan" },
                    { 232, "VUT", "678", "Vanuatu" },
                    { 233, "VAT", "379", "Vatican" },
                    { 234, "VEN", "58", "Venezuela" },
                    { 235, "VNM", "84", "Vietnam" },
                    { 236, "WLF", "681", "Wallis and Futuna" },
                    { 237, "ESH", "212", "Western Sahara" },
                    { 238, "YEM", "967", "Yemen" },
                    { 239, "ZMB", "260", "Zambia" },
                    { 240, "ZWE", "263", "Zimbabwe" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_EntryById",
                table: "Announcements",
                column: "EntryById");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_UserId",
                table: "Notification",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramRequirements_UniversityProgramId",
                table: "ProgramRequirements",
                column: "UniversityProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_Universities_CountryId",
                table: "Universities",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_UniversityPrograms_UniversityId",
                table: "UniversityPrograms",
                column: "UniversityId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProgramProcesses_UniversityId",
                table: "UserProgramProcesses",
                column: "UniversityId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProgramProcesses_UniversityProgramId",
                table: "UserProgramProcesses",
                column: "UniversityProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProgramProcesses_UserId",
                table: "UserProgramProcesses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProgramRequirements_ProgramRequirementId",
                table: "UserProgramRequirements",
                column: "ProgramRequirementId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProgramRequirements_UserProgramProcessId",
                table: "UserProgramRequirements",
                column: "UserProgramProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_NationalityId",
                table: "Users",
                column: "NationalityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Announcements");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "UserProgramRequirements");

            migrationBuilder.DropTable(
                name: "ProgramRequirements");

            migrationBuilder.DropTable(
                name: "UserProgramProcesses");

            migrationBuilder.DropTable(
                name: "UniversityPrograms");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Universities");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
