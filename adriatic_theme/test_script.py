import frappe

DEFAULT_SETTINGS = {
    "show_breadcrumbs": 1,
    "show_search_box": 1,
    "show_theme_settings": 1,
    "show_language_switcher": 1,
    "show_help_dropdown": 1,
    "show_logged_username": 1,
    "language_switcher_type": "Flag With Title",
    "menu_font_family": "Roboto",
    "menu_font_weight": "500",
    "show_sub_menu_icon": 1,
    "menu_theme_color": "Theme Color",
    "menu_font_size": 16,
    "menu_icon_size": "24",
    "menu_icons_size": "sm",
    "sidebar_layout": "separated",
    "background_color": "#007bff",
    "background_color_hover": "#66b0ff",
    "foreground_color": "#ffffff",
    "listview_background": "#daecff",
    "listview_color": "#0050a5",
}


NAVBAR = [
    {"url": "/home", "icon": "getting-started", "title": "Home", "role": "All"},
    {
        "url": "/accounting",
        "icon": "accounting",
        "title": "Accounting",
        "role": "Accounts Manager",
    },
    {
        "parent_label": "Accounting",
        "url": "/payables",
        "icon": "accounting",
        "title": "Payables",
        "role": "Accounts Manager",
    },
    {
        "parent_label": "Accounting",
        "url": "/receivables",
        "icon": "arrow-right",
        "title": "Receivables",
        "role": "Accounts Manager",
    },
    {
        "parent_label": "Accounting",
        "url": "/financial-reports",
        "icon": "file",
        "title": "Financial Reports",
        "role": "Accounts Manager",
    },
    {"url": "/buying", "icon": "buying", "title": "Buying", "role": "Purchase Manager"},
    {"url": "/selling", "icon": "sell", "title": "Selling", "role": "Sales Manager"},
    {"url": "/stock", "icon": "stock", "title": "Stock", "role": "Stock Manager"},
    {"url": "/assets", "icon": "assets", "title": "Assets", "role": "Quality Manager"},
    {"url": "/hr", "icon": "hr", "title": "HR", "role": "HR Manager"},
    {
        "parent_label": "HR",
        "url": "/recruitment",
        "icon": "users",
        "title": "Recruitment",
        "role": "HR Manager",
    },
    {
        "parent_label": "HR",
        "url": "/employee-lifecycle",
        "icon": "assign",
        "title": "Employee Lifecycle",
        "role": "HR Manager",
    },
    {
        "parent_label": "HR",
        "url": "/performance",
        "icon": "star",
        "title": "Performance",
        "role": "HR Manager",
    },
    {
        "parent_label": "HR",
        "url": "/shift-%26-attendance",
        "icon": "milestone",
        "title": "Shift & Attendance",
        "role": "HR Manager",
    },
    {
        "parent_label": "HR",
        "url": "/expense-claims",
        "icon": "expenses",
        "title": "Expense Claims",
        "role": "HR Manager",
    },
    {
        "parent_label": "HR",
        "url": "/leaves",
        "icon": "non-profit",
        "title": "Leaves",
        "role": "HR Manager",
    },
    {
        "url": "/manufacturing",
        "icon": "organization",
        "title": "Manufacturing",
        "role": "Manufacturing Manager",
    },
    {
        "url": "/quality",
        "icon": "quality",
        "title": "Quality",
        "role": "Quality Manager",
    },
    {
        "url": "/projects",
        "icon": "project",
        "title": "Projects",
        "role": "Projects Manager",
    },
    {"url": "/support", "icon": "support", "title": "Support", "role": "Support Team"},
    {"url": "/users", "icon": "users", "title": "Users", "role": "System Manager"},
    {
        "url": "/website",
        "icon": "website",
        "title": "Website",
        "role": "Website Manager",
    },
    {
        "url": "/payroll",
        "icon": "money-coins-1",
        "title": "Payroll",
        "role": "HR Manager",
    },
    {
        "parent_label": "Payroll",
        "url": "/salary-payout",
        "icon": "income",
        "title": "Salary Payout",
        "role": "HR Manager",
    },
    {
        "parent_label": "Payroll",
        "url": "/tax-%26-benefits",
        "icon": "crm",
        "title": "Tax & Benefits",
        "role": "HR Manager",
    },
    {"url": "/crm", "icon": "crm", "title": "CRM", "role": "Sales Master Manager"},
    {"url": "/tools", "icon": "tool", "title": "Tools", "role": "System Manager"},
    {
        "url": "/erpnext-settings",
        "icon": "setting",
        "title": "ERPNext Settings",
        "role": "System Manager",
    },
    {
        "url": "/integrations",
        "icon": "integration",
        "title": "Integrations",
        "role": "System Manager",
    },
    {
        "url": "/erpnext-integrations",
        "icon": "integration",
        "title": "ERPNext Integrations",
        "role": "System Manager",
    },
    {"url": "/build", "icon": "tool", "title": "Build", "role": "System Manager"},
]

THEME_COLORS = [
    {
        "theme_name": "Green",
        "listview_color": "#00a613",
        "listview_background": "#dcffd9",
        "foreground_color": "#ffffff",
        "background_color_hover": "#32b846",
        "background_color": "#22a336",
        "selected": 0,
    },
    {
        "theme_name": "Blue",
        "listview_color": "#0050a5",
        "listview_background": "#daecff",
        "foreground_color": "#ffffff",
        "background_color_hover": "#66b0ff",
        "background_color": "#007bff",
        "selected": 1,
    },
    {
        "theme_name": "Purple",
        "listview_color": "#4800a6",
        "listview_background": "#ebd9ff",
        "foreground_color": "#ffffff",
        "background_color_hover": "#ab66ff",
        "background_color": "#7b00ff",
        "selected": 0,
    },
    {
        "theme_name": "Orange",
        "listview_color": "#a66c00",
        "listview_background": "#ffeed9",
        "foreground_color": "#ffffff",
        "background_color_hover": "#ffab66",
        "background_color": "#ff9900",
        "selected": 0,
    },
    {
        "theme_name": "Yellow",
        "listview_color": "#a6a600",
        "listview_background": "#fffed9",
        "foreground_color": "#ffffff",
        "background_color_hover": "#cfcf00",
        "background_color": "#cfcf00",
        "selected": 0,
    },
    {
        "theme_name": "Red",
        "listview_color": "#a60000",
        "listview_background": "#ffd9d9",
        "foreground_color": "#ffffff",
        "background_color_hover": "#ff6666",
        "background_color": "#ff0000",
        "selected": 0,
    },
    {
        "theme_name": "Pink",
        "listview_color": "#a6007f",
        "listview_background": "#ffd9f9",
        "foreground_color": "#ffffff",
        "background_color_hover": "#ff66db",
        "background_color": "#ff00e1",
        "selected": 0,
    },
]


def update_settings(*args, **kwargs):
    settings = frappe.get_doc("Sidebar Settings", "Sidebar Settings")
    settings.theme_colors = []
    settings.navbar = []
    settings.theme_setting_language = []

    for key, value in DEFAULT_SETTINGS.items():
        setattr(settings, key, value)

    for i in THEME_COLORS:
        settings.append("theme_colors", i)

    for i in NAVBAR:
        settings.append(
            "navbar",
            {
                "url": i.get("url"),
                "label": i.get("title"),
                "icon": i.get("icon"),
                "parent_label": i.get("parent_label"),
                "role": i.get("role"),
            },
        )
    for i in ["hr", "en-GB"]:
        settings.append("theme_setting_language", {"language": i})

    frappe.db.set_value(
        "Language",
        "hr",
        {"custom_flag_image": "/assets/adriatic_theme/assets/crotia_flag.png"},
    )
    frappe.db.set_value(
        "Language",
        "en-GB",
        {"custom_flag_image": "/assets/adriatic_theme/assets/uk_flag.png"},
    )
    frappe.db.commit()
    settings.save()
