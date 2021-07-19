$(document).ready(function () {
  $(".dash-navbar").on("click", function (event) {
    // ... clicked on the 'body', but not inside of #menutop
    hideAllSections();
  });
  $("canvas").on("click", function (event) {
    // ... clicked on the 'body', but not inside of #menutop
    hideAllSections();
  });

  // All functions
  function addPaddingTop() {
    // Get navbar height
    var navbarHeight = $(".dash-navbar").outerHeight();
    $(".dash-contents .sidebar").css("paddingTop", navbarHeight);
    $(".dash-contents .details").css("paddingTop", navbarHeight);
    $(".dash-contents .market").css("paddingTop", navbarHeight);
    $(".dash-contents .order-book-section").css("paddingTop", navbarHeight);
    $(".dash-contents .calc-section").css("paddingTop", navbarHeight);
    $(".dash-contents .news-section").css("paddingTop", navbarHeight);
    $(".dash-contents .full-width").css("paddingTop", navbarHeight);
  }

  // Show specific section
  function showSection(section) {
    hideAllSections();
    $(section).show();
  }

  // Hide specific section
  function hideSection(section) {
    hideAllSections();
    $(section).hide();
  }

  // Hide all sections
  function hideAllSections() {
    $(".buy-option").hide();
    $(".sell-option").hide();
    $(".real-account-box").hide();
    $(".notification-box").hide();
  }

  function addAmount() {
    var amount = $(
      ".dash-contents .trade .trade-action .trade-amount .trade-amount-input .amount input"
    ).val();
    amount++;
    $(
      ".dash-contents .trade .trade-action .trade-amount .trade-amount-input .amount input"
    ).val(amount);
  }

  function minusAmount() {
    var amount = $(
      ".dash-contents .trade .trade-action .trade-amount .trade-amount-input .amount input"
    ).val();
    amount--;
    $(
      ".dash-contents .trade .trade-action .trade-amount .trade-amount-input .amount input"
    ).val(amount);
  }

  function dashboardDetails(action) {
    if (action == "hide") {
      $(".dash-contents .market .tradingview-widget-copyright").css({
        width: "73vh",
      });
      $(".dash-contents .details").css({
        width: "0",
      });
      $(".dash-contents .details .expand-btn").removeClass("close");
      $(".dash-contents .details .expand-btn").addClass("open");
    }

    if (action == "show") {
      $(".dash-contents .market .tradingview-widget-copyright").css({
        width: "70vh",
      });
      $(".dash-contents .details").css({
        width: "23vh",
      });
      $(".dash-contents .details .expand-btn").removeClass("open");
      $(".dash-contents .details .expand-btn").addClass("close");
    }
  }

  addPaddingTop();

  $(".dash-contents").on("click", ".details .expand-btn.close", function () {
    dashboardDetails("hide");
    
  });

  $(".dash-contents").on("click", ".details .expand-btn.open", function () {
    dashboardDetails("show");
  
  });
  $(".buy-option").on("click", function (event) {});

  $(".sell-option").on("click", function (event) {});
  // Show buy box
  $(".dash-contents .trade .trade-action .actions .buy").on(
    "click",
    function (event) {
      event.stopPropagation();

      showSection(".buy-option");
    }
  );

  // Hide buy box
  $(".buy-option span.close").on("click", function (event) {
    event.stopPropagation();

    hideSection(".buy-option");
  });

  $(".buy-option 	.close1").on("click", function (event) {
    event.stopPropagation();

    hideSection(".buy-option");
  });

  // Show sell box
  $(".dash-contents .trade .trade-action .actions .sell").on(
    "click",
    function (event) {
      event.stopPropagation();

      showSection(".sell-option");
    }
  );

  // Hide sell box
  $(".sell-option span.close").on("click", function (event) {
    hideSection(".sell-option");
    event.stopPropagation();
  });

  $(".sell-option button.close1").on("click", function (event) {
    event.stopPropagation();

    hideSection(".sell-option");
  });

  // Show real account box
  $(".dash-navbar .account .real-account a").on("click", function (event) {
    event.stopPropagation();

    showSection(".real-account-box");
  });

  // Hide sell box
  $(".real-account-box span.close").on("click", function (event) {
    event.stopPropagation();

    hideSection(".real-account-box");
  });

  // Show notification box
  $(".dash-navbar .account .notification a").on("click", function (event) {
    event.stopPropagation();

    showSection(".notification-box");
  });

  // Hide notification box
  $(".notification-box span.close").on("click", function (event) {
    event.stopPropagation();

    hideSection(".notification-box");
  });

  // Show forex box
  $("#add-to-group").on("click", function (event) {

    showSection(".forex-box");
  });



  $(".forex-box .childIsh").on("click", function (event) {
    event.stopPropagation();

    hideSection(".forex-box");
  });

  $(".dash-contents .trade .trade-action .trade-amount .trade-amount-add").on(
    "click",
    function () {
      addAmount();
    }
  );

  $(".dash-contents .trade .trade-action .trade-amount .trade-amount-minus").on(
    "click",
    function () {
      minusAmount();
    }
  );

  // Open profile box
  $(".account-profile").on("click", function () {
    hideAllSections();
    $(".profile-box").css("right", "0");
  });

  // Close profile box
  $(".profile-box [data-action='close']").on("click", function () {
    $(".profile-box").css("right", "-1000px");
  });

  $(".profile-box span.close").on("click", function () {
    $(".profile-box").css("right", "-1000px");
  });

  $(".dash-contents .order").on("click", ".untoggled", function () {
    $(".dash-contents .order .expand").removeClass("untoggled");
    $(".dash-contents .order .expand").addClass("toggled");
    $(".dash-contents .order .dtls .all-tables").show();
    $(".dash-contents .order .dtls .tables").eq(0).show();

    $(".dash-contents .order").css({
      height: "65vh",
      overflow: "auto",
    });

    $(".dash-contents .trade .chart .tradingview-widget-copyright").css({
      height: "54vh",
    });

  });

  $(".dash-contents .order").on("click", ".toggled", function () {
    $(".dash-contents .order .text").removeClass("active");

    $(".dash-contents .order .expand").addClass("untoggled");
    $(".dash-contents .order .expand").removeClass("toggled");
    $(".dash-contents .order .dtls .all-tables").hide();
    $(".dash-contents .order .dtls .tables").hide();

    $(".dash-contents .order").css({
      height: "15vh",
      overflow: "hidden",
    });

    $(".dash-contents .trade .chart .tradingview-widget-copyright").css({
      height: "73vh",
    });

  });

  $(".dash-contents .order .text")
    .eq(0)
    .on("click", function () {
      $(".dash-contents .order .text").removeClass("active");
      $(this).addClass("active");
      $(".dash-contents .order .dtls .tables").hide();
      $(".dash-contents .order .dtls .tables").eq(0).show();
    });

  $(".dash-contents .order .text")
    .eq(1)
    .on("click", function () {
      $(".dash-contents .order .text").removeClass("active");
      $(this).addClass("active");
      $(".dash-contents .order .dtls .tables").hide();
      $(".dash-contents .order .dtls .tables").eq(1).show();
    });

  // Tabs
  $(".tabs-details").eq(0).show();

  $(".tabs a").on("click", function () {
    var tabName = $(this).attr("data-tab");

    if (tabName !== undefined) {
      $(".tabs-details").hide();
      $("[data-tab-dtl='" + tabName + "']").show();

      $(".tabs a").removeClass("active");
      $("[data-tab='" + tabName + "']").addClass("active");
    }
  });

  // Hover over instrument
  $(".forex-box .second table tr").mouseenter(function () {
    var index = $(".forex-box .second table tr").index(this);
    var eq = index - 1;
    $(".instrument-box").hide();
    $(".instrument-box").eq(eq).show();
  });

  $(".instrument-box").mouseleave(function () {
    $(this).hide();
  });

  $(".forex-box .first a")
    .eq(0)
    .on("click", function () {
      $(".forex-box .first a").removeClass("active");
      $(this).addClass("active");

      $(".forex-box .second .all").show();
      $(".forex-box .second .favourites").hide();
    });

  $(".forex-box .first a")
    .eq(1)
    .on("click", function () {
      $(".forex-box .first a").removeClass("active");
      $(this).addClass("active");

      $(".forex-box .second .all").hide();
      $(".forex-box .second .favourites").show();
    });
  // $(".dash-navbar .stock").on("click", ".stock-box span.close", function(){
  // 	var index = $(".dash-navbar .stock .stock-box span.close").index(this);
  // 	$(".dash-navbar .stock .stock-box").eq(index).remove();
  // });

  function orderBook(action) {
    var orderBookIsVisible = $(".dash-contents .order-book-section").is(
      ":visible"
    );
    var calcIsVisible = $(".dash-contents .calc-section").is(":visible");
    var newsIsVisible = $(".dash-contents .news-section").is(":visible");
    var orderBookNotVisible = $(".dash-contents .order-book-section").is(
      ":hidden"
    );
    var calcNotVisible = $(".dash-contents .calc-section").is(":hidden");
    var newsNotVisible = $(".dash-contents .news-section").is(":hidden");

    if (action == "show") {
      $('[dash-action="order-book"]').addClass("active");
      $(".dash-contents .order-book-section").show();
      if (calcIsVisible && newsIsVisible) {
        $(".dash-contents .market").css({
          width: "34%",
        });
        $(".dash-contents .order").css({
          width: "34%",
        });
        $(".dash-contents .full-width").css({
          left: "66%",
          width: "33%",
          position: "absolute",
        });
      } else if (calcIsVisible && newsNotVisible) {
        $(".dash-contents .market").css({
          width: "36%",
        });
        $(".dash-contents .order").css({
          width: "36%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else if (calcNotVisible && newsIsVisible) {
        $(".dash-contents .market").css({
          width: "36%",
        });
        $(".dash-contents .order").css({
          width: "36%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      }
    }
    if (action == "hide") {
      $('[dash-action="order-book"]').removeClass("active");
      $(".dash-contents .order-book-section").hide();
      $(".dash-contents .market").css("width", "76%");
      if (calcIsVisible && newsIsVisible) {
        $(".dash-contents .market").css({
          width: "54%",
        });
        $(".dash-contents .order").css({
          width: "54%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else if (calcIsVisible && newsNotVisible) {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      } else if (calcNotVisible && newsIsVisible) {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      } else {
        $(".dash-contents .market").css({
          width: "76%",
        });
        $(".dash-contents .order").css({
          width: "76%",
        });
        $(".dash-contents .full-width").css({
          left: "6%",
          position: "absolute",
        });
      }
    }
  }

  function calcSection(action) {
    var orderBookIsVisible = $(".dash-contents .order-book-section").is(
      ":visible"
    );
    var calcIsVisible = $(".dash-contents .calc-section").is(":visible");
    var newsIsVisible = $(".dash-contents .news-section").is(":visible");
    var orderBookNotVisible = $(".dash-contents .order-book-section").is(
      ":hidden"
    );
    var calcNotVisible = $(".dash-contents .calc-section").is(":hidden");
    var newsNotVisible = $(".dash-contents .news-section").is(":hidden");

    if (action == "show") {
      $('[dash-action="calc"]').addClass("active");
      $(".dash-contents .calc-section").show();
      if (orderBookIsVisible && newsIsVisible) {
        $(".dash-contents .market").css({
          width: "34%",
        });
        $(".dash-contents .order").css({
          width: "34%",
        });
        $(".dash-contents .full-width").css({
          left: "66%",
          width: "33%",
          position: "absolute",
        });
      } else if (orderBookIsVisible && newsNotVisible) {
        $(".dash-contents .market").css({
          width: "54%",
        });
        $(".dash-contents .order").css({
          width: "54%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else if (orderBookNotVisible && newsIsVisible) {
        $(".dash-contents .market").css({
          width: "54%",
        });
        $(".dash-contents .order").css({
          width: "54%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      }
    }
    if (action == "hide") {
      $('[dash-action="calc"]').removeClass("active");
      $(".dash-contents .calc-section").hide();
      if (orderBookIsVisible && newsIsVisible) {
        $(".dash-contents .market").css({
          width: "54%",
        });
        $(".dash-contents .order").css({
          width: "54%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else if (orderBookIsVisible && newsNotVisible) {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      } else if (orderBookNotVisible && newsIsVisible) {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      } else {
        $(".dash-contents .market").css({
          width: "76%",
        });
        $(".dash-contents .order").css({
          width: "76%",
        });
        $(".dash-contents .full-width").css({
          left: "6%",
          position: "absolute",
        });
      }
    }
  }

  function newsSection(action) {
    var orderBookIsVisible = $(".dash-contents .order-book-section").is(
      ":visible"
    );
    var calcIsVisible = $(".dash-contents .calc-section").is(":visible");
    var newsIsVisible = $(".dash-contents .news-section").is(":visible");
    var orderBookNotVisible = $(".dash-contents .order-book-section").is(
      ":hidden"
    );
    var calcNotVisible = $(".dash-contents .calc-section").is(":hidden");
    var newsNotVisible = $(".dash-contents .news-section").is(":hidden");

    if (action == "show") {
      $('[dash-action="news"]').addClass("active");
      $(".dash-contents .news-section").show();
      if (orderBookIsVisible && calcIsVisible) {
        $(".dash-contents .market").css({
          width: "34%",
        });
        $(".dash-contents .order").css({
          width: "34%",
        });
        $(".dash-contents .full-width").css({
          left: "66%",
          width: "33%",
          position: "absolute",
        });
      } else if (orderBookIsVisible && calcNotVisible) {
        $(".dash-contents .market").css({
          width: "54%",
        });
        $(".dash-contents .order").css({
          width: "54%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else if (orderBookNotVisible && calcIsVisible) {
        $(".dash-contents .market").css({
          width: "54%",
        });
        $(".dash-contents .order").css({
          width: "54%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      }
    }
    if (action == "hide") {
      $('[dash-action="news"]').removeClass("active");
      $(".dash-contents .news-section").hide();
      if (orderBookIsVisible && calcIsVisible) {
        $(".dash-contents .market").css({
          width: "54%",
        });
        $(".dash-contents .order").css({
          width: "54%",
        });
        $(".dash-contents .full-width").css({
          left: "46%",
          width: "54%",
          position: "absolute",
        });
      } else if (orderBookIsVisible && calcNotVisible) {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      } else if (orderBookNotVisible && calcIsVisible) {
        $(".dash-contents .market").css({
          width: "56%",
        });
        $(".dash-contents .order").css({
          width: "56%",
        });
        $(".dash-contents .full-width").css({
          left: "26%",
          width: "76%",
          position: "absolute",
        });
      } else {
        $(".dash-contents .market").css({
          width: "76%",
        });
        $(".dash-contents .order").css({
          width: "76%",
        });
        $(".dash-contents .full-width").css({
          left: "6%",
          position: "absolute",
        });
      }
    }
  }

  // // Switch tabs
  // $(".dash-tab-sec").eq(0).show();
  // $(".dash-contents .order-book-section .order-book-sec .tabs a").on(
  //   "click",
  //   function (e) {
  //     e.preventDefault();
  //     var index = $(
  //       ".dash-contents .order-book-section .order-book-sec .tabs a"
  //     ).index(this);

  //     $(
  //       ".dash-contents .order-book-section .order-book-sec .tabs a"
  //     ).removeClass("active");
  //     $(this).addClass("active");

  //     $(".dash-tab-sec").hide();
  //     $(".dash-tab-sec").eq(index).show();
  //   }
  // );

  // Switch tabs
  $(".dash-tab-sec").eq(0).show();
  $(".dash-contents .order-book-section .order-book-sec .tabs a").on(
    "click",
    function (e) {
      e.preventDefault();
      var index = $(
        ".dash-contents .order-book-section .order-book-sec .tabs a"
      ).index(this);

      $(
        ".dash-contents .order-book-section .order-book-sec .tabs a"
      ).removeClass("active");
      $(this).addClass("active");

      $(".dash-tab-sec").hide();
      $(".dash-tab-sec").eq(index).show();
    }
  );

  // News Tab Section
  $(".dash-contents .news-section .tabs-details [news-tab-detail]")
    .eq(0)
    .show();
  $(".dash-contents .news-section .tabs .tab").on("click", function () {
    var index = $(".dash-contents .news-section .tabs .tab").index(this);
    $(".dash-contents .news-section .tabs-details [news-tab-detail]").hide();
    $(".dash-contents .news-section .tabs-details [news-tab-detail]")
      .eq(index)
      .show();
    $(".dash-contents .news-section .tabs .tab").removeClass("active");
    $(".dash-contents .news-section .tabs .tab").eq(index).addClass("active");
  });

  $(".manager-tab-dtls").eq(0).show();
  $(".manager-tabs .tab").on("click", function () {
    var index = $(".manager-tabs .tab").index(this);
    $(".manager-tab-dtls").hide();
    $(".manager-tab-dtls").eq(index).show();
    $(".manager-tabs .tab").removeClass("active");
    $(".manager-tabs .tab").eq(index).addClass("active");
  });

  // Customized Actions
  $('[dash-action="order-book"]').on("click", function (event) {
    event.preventDefault();
    if ($(".dash-contents .order-book-section").is(":visible")) {
      orderBook("hide");
    } else {
      orderBook("show");
    }
  });

  $('[dash-action="calc"]').on("click", function (event) {
    event.preventDefault();
    if ($(".dash-contents .calc-section").is(":visible")) {
      calcSection("hide");
    } else {
      calcSection("show");
    }
  });

  $('[dash-action="news"]').on("click", function (event) {
    event.preventDefault();
    if ($(".dash-contents .news-section").is(":visible")) {
      newsSection("hide");
    } else {
      newsSection("show");
    }
  });

  // Calc Sortable

  // With options:
  $("#calcSort").sortable({
    // SortableJS options go here
    // See: (https://github.com/SortableJS/Sortable#options)

    // handle: '.handle',
    animation: 150,
    invertSwap: true,
    easing: "cubic-bezier(1, 0, 0, 1)",
    // . . .
  });

  $(".dash-contents .calc-section .calc-instrument").eq(0).addClass("active");

  // News Tab Section
  $(".dash-contents .news-section .tabs-details [news-tab-detail]")
    .eq(0)
    .show();
  $(".dash-contents .news-section .tabs .tab").on("click", function () {
    var index = $(".dash-contents .news-section .tabs .tab").index(this);
    $(".dash-contents .news-section .tabs-details [news-tab-detail]").hide();
    $(".dash-contents .news-section .tabs-details [news-tab-detail]")
      .eq(index)
      .show();
    $(".dash-contents .news-section .tabs .tab").removeClass("active");
    $(".dash-contents .news-section .tabs .tab").eq(index).addClass("active");
  });

  // Hide order-book-section box
  $(".order-book-section span.close .lnr-cross").on("click", function () {
    hideSection(".order-book-section");
    orderBook("hide");
  });

  // Hide calc-section box
  $(".calc-section span.close .lnr-cross").on("click", function () {
    hideSection(".calc-section");
    calcSection("hide");
  });

  // Hide news-section box
  $(".news-section span.close .lnr-cross").on("click", function () {
    hideSection(".news-section");
    newsSection("hide");
  });
  $(window).resize(function () {
    addPaddingTop();
  });
});