const original_refresh = frappe.views.ListView.prototype.refresh;
frappe.views.ListView.prototype.refresh = function (listview) {
    original_refresh.call(this);
    const $page = this.$page;

    if (!$page) {
        return;
    }

    if (window.innerWidth < 768) {
        return
    }

    if (this.columns.length < 6) {
        return;
    }

    const $list = $page.find(".layout-main-section.frappe-card  .frappe-list");
    if ($list.hasClass("frappe-list-horizontal")) {
        return;
    }

    $list.addClass("frappe-list-horizontal");
};
