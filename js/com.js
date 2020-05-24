var motionItems = [
    [
        {method: 'add', items: [
            {el: '.el1_org', to: {opacity: 0}, d: 3.0},
            {el: '.el1', to: {opacity: 1}, d: 3.0},
        ]}
    ],
    [
        {method: 'add', items: [
            {el: '.el2_org', to: {opacity: 0}, d: 3.0},
            {el: '.el2', to: {opacity: 1}, d: 3.0},
        ]}
    ],
    [
        {method: 'add', items: [
            {el: '.el3_org', to: {opacity: 0}, d: 3.0},
            {el: '.el3', to: {opacity: 1}, d: 3.0},
        ]}
    ],
    [
        {method: 'add', items: [
            {el: '.el4_org', to: {opacity: 0}, d: 3.0},
            {el: '.el4', to: {opacity: 1}, d: 3.0},
        ]}
    ],
    [
        {method: 'add', items: [
            {el: '.el5_org', to: {opacity: 0}, d: 3.0},
            {el: '.el5', to: {opacity: 1}, d: 3.0},
        ]}
    ],
    [
        {method: 'add', items: [
            {el: '.el6_org', to: {opacity: 0}, d: 3.0},
            {el: '.el6', to: {opacity: 1}, d: 3.0},
        ]}
    ],
    [
        {method: 'add', items: [
            {el: '.el7_org', to: {opacity: 0}, d: 3.0},
            {el: '.el7', to: {opacity: 1}, d: 3.0},
        ]}
    ],
    [
        {el: '.el8_0', set: {backgroundPositionX: "0"}, to: {backgroundPositionX: "707", ease: Back.Power0}, d: 2.4},
        {el: '.el8_1', set: {width: "0%"}, to: {width: "100%"}, d: 1.2, t: '-=0.8'},
    ],
    [
        {el: '.el9_1', set: {width: "0%"}, to: {width: "100%"}, d: 1.2},
    ],
    [
        {el: '.el10_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.4},
    ],
    [
        {el: '.el11_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.4},
    ],
    [
        {el: '.el12_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.4},
    ],
    [
        {el: '.el13_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.4},
    ],
    [
        {el: '.el14_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.4},
    ],
    [
        {el: '.el15_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.4},
    ],
    [
        {el: '.el16_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.4},
    ],
    [
        {el: '.el17_1', to: {scale: 1.05}, d: 5.0}
    ],
];
new YMotion(motionItems, {rewind: true}).activate();