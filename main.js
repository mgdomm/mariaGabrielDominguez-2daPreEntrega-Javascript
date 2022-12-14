const carrito = [];

const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- '+producto.nombre+' €'+producto.precio
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'));
    comprarProductos(listaOrdenada);
};

const comprarProductos = (listaDeProductos) => {
    let seguirComprando;
    let productoNombre = '';
    let productoCantidad = 0;

    do {
        productoNombre = prompt('Que producto desea comprar'+'\n\n'+listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos quieres comprar?'));

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad);
        } else {
            alert('El producto no se encuentra disponible!');
        }

        seguirComprando = confirm('¿Desea agregar otro producto?')
    } while (seguirComprando);

    confirmarCompra();
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId);
    if (productoRepetido) {
        productoRepetido.cantidad += productoCantidad
    } else {
        producto.cantidad += productoCantidad;
        carrito.push(producto)
    }
    console.log(carrito)
};

const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    });

    const confirmar = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar productos del carrito.'
    );

    if (confirmar) {
        finalizarCompra(listaProductos);
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:');
        eliminarProductoCarrito(productoAEliminar);
    }
};

const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, elemento) => acc + elemento.cantidad, 0);
    const precioTotal = carrito.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0);

    alert('Detalle de tu compra:'
        +'\n\n'+listaProductos.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de la compra es: '+precioTotal
        +'\n\nGracias por su compra!'
    );
};

const comprar = () => {
    const productosBaratos = confirm('Ordena de menos a mayor precio');
    if (productosBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};

comprar()