import template from './templates/test.j2';

const model = {
    product: {
    }
};

const templateString = template.render(model);
