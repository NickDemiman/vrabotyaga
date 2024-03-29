import { Component } from "./snail/component";

type VNode = {
    tag: string,
    _instance: Component,
    attrs: Object,
    children: Array<Object>,
}

class VHTMLElement extends HTMLElement {
    constructor() {
        super();
    }
}

function create(vnode: VNode) : void {

}

// function create(vnode: VNode | string) : HTMLElement | Text {
// 	// Если создаём текстовый узел
// 	if (typeof vnode === 'string') {
// 		return document.createTextNode(vnode);
// 	}
// 	// Если создаём компонент
// 	if (typeof vnode.tag === 'function') {
// 		console.groupCollapsed(`${vnode.tag.name}: create`);

// 		// Создаём инстанс компонента
// 		vnode._instance = new (vnode.tag(vnode.attrs, vnode.children));
// 		// Выполняем его шаблон
// 		const componentVnode = vnode._instance.render();

// 		// Создаём DOM по шаблону
// 		const node = create(componentVnode);
// 		// Записываем ссылку на элемент в компонент
// 		vnode._instance.el = node;

// 		// Сохраняем шаблон компонента для эффективного обновления
// 		node._originalVnode = node._vnode;
// 		// Записываем vdom инстанса компонента
// 		node._vnode = vnode;

// 		// Вызываем метод жизненного цикла
// 		vnode._instance.onMount();

// 		console.groupEnd();
// 		return node;
// 	}

// 	const node = document.createElement(vnode.tag);

// 	// Добавляем атрибуты
// 	if (vnode.attrs) {
// 		for (const [name, value] of Object.entries(vnode.attrs)) {
// 			node.setAttribute(name, value);
// 		}
// 	}

// 	// Создаём детей
// 	if (vnode.children) {
// 		for (const child of vnode.children) {
// 			node.appendChild(create(child));
// 		}
// 	}

// 	// Связываем виртуальный и реальный DOM
// 	node._vnode = vnode;

// 	return node;
// }

// function updateAttrs(node, prevAttrs, attrs) {
// 	// Задаём новые значения атрибутов
// 	if (attrs) {
// 		for (const [name, value] of Object.entries(attrs)) {
// 			node.setAttribute(name, value);
// 		}
// 	}

// 	// Удаляем старые атрибуты, которых не встретилось в новых
// 	if (prevAttrs) {
// 		for (const name of Object.keys(prevAttrs)) {
// 			if (!attrs || !attrs.hasOwnProperty(name)) {
// 				node.removeAttribute(name);
// 			}
// 		}
// 	}
// }

// function updateChildren(node, prevChildren, children) {
// 	const childLength = children ? children.length : 0;

// 	for (let i = 0, j = 0; i < childLength; i++, j++) {
// 		const prevVchild = prevChildren && prevChildren[j];
// 		const vchild = children[i];

// 		const fromString = typeof prevVchild === 'string';
// 		const toString = typeof vchild === 'string';

// 		if (fromString && toString) {
// 			// Если старый и новый элемент -- строки
// 			// Внимание! .childNodes, не .children!
// 			node.childNodes[i].textContent = vchild;
// 		} else if (
// 			!fromString &&
// 			!toString &&
// 			prevVchild &&
// 			prevVchild.key === vchild.key
// 		) {
// 			// Ключи совпадают -- можем обновить оптимально
// 			update(node.childNodes[i], vchild);
// 		} else {
// 			// Если строка превращается в элемент или наоборот
// 			// Либо у элементов не совпали ключи
// 			// Вставляем новую ноду перед текущей, старая нода при этом "всптывает" в конец
// 			node.insertBefore(create(vchild), node.childNodes[i]);
// 			// Сдвигаем индекс сравнения массива старых чайлдов
// 			j--;
// 		}
// 	}

// 	const curChildLength = node.childNodes.length;

// 	// Удаляем "лишние" узлы
// 	for (let i = childLength; i < curChildLength; i++) {
// 		destroy(node.childNodes[childLength]);
// 		node.removeChild(node.childNodes[childLength]);
// 	}
// }

// function update(node, vnode) {
// 	let prevVnode = node._vnode;
// 	let resultVnode = vnode;
// 	const isComponent = typeof prevVnode.tag === 'function';

// 	// Если обновляем компонент
// 	if (isComponent) {
// 		console.groupCollapsed(`${prevVnode.tag.name}: update`);

// 		// Прокидываем компоненту новые атрибуты и дочерние элементы, пришедшие сверху
// 		prevVnode._instance.willUpdate(vnode.attrs, vnode.children);
// 		// Выполняем шаблон компонента с новыми атрибутами
// 		vnode = prevVnode._instance.render();
// 		// Переносим инстанс со старой ноды на новую
// 		resultVnode._instance = prevVnode._instance;
// 		// Дальше сравнивать будет именно со старым vdom шаблона, а не компонента
// 		prevVnode = node._originalVnode;
// 		// Обновляем шаблон компонента
// 		node._originalVnode = vnode;
// 	}

// 	updateAttrs(node, prevVnode.attrs, vnode.attrs);
// 	updateChildren(node, prevVnode.children, vnode.children);

// 	// Обновлем связь с virtual DOM
// 	node._vnode = resultVnode;

// 	// Вызываем метод жизненного цикла компонента
// 	if (isComponent) {
// 		resultVnode._instance.didUpdate();

// 		console.groupEnd();
// 	}

// 	return node;
// }

// function destroy(node) {
// 	const vnode = node._vnode;

// 	if (vnode) {
// 		const isComponent = typeof vnode.tag === 'function';

// 		// Если удаляем компонент, вызовем метод жизненного цикла
// 		if (isComponent) {
// 			console.groupCollapsed(`${vnode.tag.name}: destroy`);
// 			vnode._instance.willDestroy();
// 		}

// 		// Удаляем детей
// 		for (const child of node.childNodes) {
// 			destroy(child);
// 		}

// 		// Не забываем закрывать группу
// 		if (isComponent) {
// 			console.groupEnd();
// 		}
// 	}
// }

export const vdom = {
	create,
	// update,
	// destroy,
};