import template from './templates/quickshop.j2';

const model = {
    quickshop: {
        product: {
            a: true,
            b: true,
            c: true,
            d: true,
            e: true,
            f: {
                g: 'g',
                h: 'h'
            },
            i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            j: '                                                                                                                                                                                                                                                                                                                '
        },
        product2: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product3: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product4: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product5: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product6: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product7: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product8: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product9: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product10: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product11: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product12: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product13: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product14: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product15: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '},
        product16: {a: true, b: true, c: true, d: true, e: true, f: {g: 'g', h: 'h'}, i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], j: '                                                                                                                                                                                                                                                                                                                '}
    }
};

window.onclick = (e)=> {
    console.log('click');
    const templateString = template.render(model);
    console.log(templateString);
};
