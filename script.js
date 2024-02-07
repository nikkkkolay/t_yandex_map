$(window).bind("scroll", function () {
    if ($(window).scrollTop() > 170) {
        $(".navbar-bottom").addClass("fixed");
    } else {
        $(".navbar-bottom").removeClass("fixed");
    }
});

$(window).bind("scroll", function () {
    if ($(window).scrollTop() > 3100) {
        $(".button_fixed").addClass("button_fixed_change");
    } else {
        $(".button_fixed").removeClass("button_fixed_change");
    }
});

$(window).bind("load", function () {
    if ($(window).scrollTop() > 170) {
        $(".navbar-bottom").addClass("fixed");
    } else {
        $(".navbar-bottom").removeClass("fixed");
    }
});

$(".navbar-collapse").on("click", function () {
    $(".navbar-collapse").collapse("hide");
    $a = $($(this).attr("href"));
    $("html,body").animate(
        {
            scrollTop: $a.offset().top - 50,
        },
        500
    );
    return false;
});

async function initMap() {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } = ymaps3;

    const map = new YMap(
        document.getElementById("app-contact"),
        {
            location: {
                center: [33.06208599275346, 68.95469889784452],
                zoom: 16,
            },
        },
        [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
    );

    const layer = new YMapDefaultSchemeLayer({
        customization: [
            {
                tags: {
                    all: ["landscape"],
                },
                elements: "geometry",
                stylers: [
                    {
                        color: "#f2fbff",
                    },
                ],
            },
            {
                tags: {
                    all: ["admin"],
                },
                elements: "geometry",
                stylers: [
                    {
                        color: "#eaf6fc",
                    },
                ],
            },
            {
                tags: {
                    all: ["road"],
                },
                elements: "geometry.fill",
                stylers: [
                    {
                        color: "#FAFAFA",
                    },
                ],
            },
            {
                tags: {
                    all: ["road"],
                },
                elements: "geometry.outline",
                stylers: [
                    {
                        color: "#CCCCCC",
                    },
                ],
            },
            {
                tags: {
                    all: ["crosswalk", "path"],
                },
                stylers: [
                    {
                        color: "#14898f",
                    },
                ],
            },
            {
                tags: {
                    any: ["structure"],
                },
                stylers: [
                    {
                        color: "#DDDDDD",
                    },
                ],
            },
            {
                tags: {
                    any: ["water"],
                },
                elements: "geometry",
                stylers: [
                    {
                        color: "#56aee0",
                    },
                ],
            },
            {
                tags: {
                    any: ["transit"],
                },
                elements: "label.icon",
                stylers: [
                    {
                        color: "#14898F",
                    },
                ],
            },
            {
                tags: {
                    any: ["transit"],
                },
                elements: "label.text.fill",
                stylers: [
                    {
                        color: "#14898F",
                    },
                ],
            },
            {
                tags: {
                    any: ["poi"],
                },
                elements: "label.icon",
                stylers: [
                    {
                        color: "#666666",
                    },
                ],
            },
            {
                tags: {
                    any: ["poi"],
                },
                elements: "label.text.fill",
                stylers: [
                    {
                        color: "#666666",
                    },
                ],
            },
        ],
    });

    const markerPropsVO = [
        {
            coordinates: [33.06208599275346, 68.95469889784452],
            iconSrc: "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            message: "I'm yellow capybara!",
        },
        {
            coordinates: [33.0767053822784, 68.96478012321226],
            iconSrc: "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
            message: "I'm yellow capybara!",
        },
    ];

    map.addChild(layer);

    markerPropsVO.forEach((markerProp) => {
        const markerElement = document.createElement("img");
        markerElement.className = "icon-marker";
        markerElement.src = markerProp.iconSrc;
        markerElement.onclick = () => alert(markerProp.message);
        map.addChild(new YMapMarker({ coordinates: markerProp.coordinates }, markerElement));
    });
}

initMap();
