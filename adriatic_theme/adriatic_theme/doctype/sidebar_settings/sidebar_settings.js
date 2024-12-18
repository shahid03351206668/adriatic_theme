frappe.ui.form.on('Sidebar Settings', {
    refresh(frm) { }
})

frappe.ui.form.on('Theme Settings Colors', {
    refresh(frm) { },
    selected(frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (row.selected) {
            for (const i of frm.doc.theme_colors) {
                if (i.name != cdn && i.selected) {
                    i.selected = false;
                }
            }
            frm.refresh_field("theme_colors")
        }
    }
})