import Column from "./Column.js";

export default class Kanban {
    constructor (root) {
        this.root = root;

        Kanban.columns().forEach(column => {
            // Criar uma instância da classe de Coluna
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);
        });
    }

    static columns () {
        return [
            {
                id: 1,
                title: "Não iniciado"
            },
            {
                id: 2,
                title: "Em progresso"
            },
            {
                id: 3,
                title: "Completado"
            },
        ];
    }
}
