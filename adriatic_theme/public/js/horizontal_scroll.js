function applyCustomStyles($page) {

    // $page.find('.frappe-list .list-row-col').css({
    //     'min-width': '120px',
    //     'max-width': '120px'
    // });

    // $page.find('.list-subject').css({
    //     'min-width': '200px',
    //     'max-width': '200px'
    // });
    // $page.find('.frappe-list').css('overflow-x', 'auto');
    // $page.find('.list-row-head, .list-row-container').css('width', 'max-content');
    // $page.find('.level-right .list-count').css('white-space', 'nowrap');


    // $page.find('.frappe-list .list-row-col').css({
    //     'min-width': 'auto',
    //     "width": "200px",
    //     'max-width': 'auto',
    // });

    // $page.find('.list-subject').css({
    //     'min-width': 'auto',
    //     "width": "200px",
    //     'max-width': 'auto',
    // });

    $page.find('.frappe-list .list-row-col').css({
        "width": "200px !important",
        "max-width": "100%",
    });

    $page.find('.frappe-list .list-subject').css({
        "width": "300px !important",
        "max-width": "100%",
    });


    $page.find('.frappe-list').css('overflow-x', 'auto');
    $page.find('.frappe-list .result').css({ width: "2000px" });
}

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
