import frappe


def has_role(role):
    roles = frappe.get_roles()
    if role in roles:
        return True


def get_child_elements(value, dataset):
    ch = []
    for i in dataset:
        if i.get("parent_label") == value:
            ch.append(i)

    return ch


@frappe.whitelist()
def get_sidebar_data():
    data = []
    d = frappe.db.sql(
        """ SELECT 
                label,
                role,
                icon,
                url,
                parent_label
            FROM `tabSidebar Settings Elements`
            ORDER BY idx
        """,
        as_dict=True,
    )

    for i in d:
        label = i.get("label")
        row = {
            "label": i.get("label"),
            "icon": i.get("icon"),
            "url": i.get("url"),
        }

        childs = get_child_elements(label, d)

        if childs:
            row["childs"] = childs

        if has_role(i.get("role")) and not i.parent_label:
            data.append(row)

    frappe.response["settings"] = frappe.get_doc("Sidebar Settings", "Sidebar Settings")
    frappe.response["data"] = data


@frappe.whitelist()
def get_theme_data():
    languages_data = frappe.db.sql(
        """ SELECT la.custom_flag_image as flag, s.language, la.name as language_id, la.language_name from `tabTheme Setting Language` s  INNER JOIN `tabLanguage` la on la.name = s.language  where 1=1 order by s.idx""",
        as_dict=True,
    )
    frappe.response["languages"] = languages_data
    frappe.response["data"] = frappe.get_doc("Sidebar Settings", "Sidebar Settings")
