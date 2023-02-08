export default class KanbanAPI {
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId);

        if (!column) {
            return [];
        }

        return column.items;
    }

    static insertItem(columnId, content) {
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 10000),
            content
        };

        if(!column) {
            throw new Error ("Coluna inexistente.");
        }

        column.items.push(item);
        save(data);

        return item;
    }

    static updateItem(itemId, newProps) {
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemId);

                if (item) {
                    return [item, column];
                }
            }
        })();

        if (!item) {
            throw new Error("Não encontrado.")
        }

        item.content = newProps.content === undefined ? item.content : newProps.content;

        // Atualizar coluna e posição
        if (
            newProps.columnId !== undefined
            && newProps.position !== undefined
        ) {
            const targetColumn = data.find(column => column.id == newProps.columnId);

            if (!targetColumn){
                throw new Error ("Coluna não encontrada.");
            }

            // Deletar o item da coluna atual
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            //Mover o item para a nova coluan e posição
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save(data);
    }

    static deleteItem(itemId) {
        const data = read();

        for (const column of data) {
            const item = column.items.find(item => item.id == itemId);

            if (item) {
                column.items.splice(column.items.indexOf(item), 1);
            }
        }

        save(data);
    }
}

function read() {
    const json = localStorage.getItem("kanban-data")

    if (!json) {
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
        ];
    }

    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
}
