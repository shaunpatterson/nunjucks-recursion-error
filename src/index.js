import template from './templates/test.j2';

const model = {
    product: {
    }
};

window.onclick = (e)=> {
    console.log('click');
    const templateString = template.render(model);
    console.log(templateString);
}
