const mutations = {
    async createItem(parent, args, context, info) {
        const item = await context.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    },

    updateItem(parent, args, context, info) {
        //Take a copy of the updates
        const updates = { ...args };
        delete updates.id;
        // Run the update method
        return context.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id
                }
            },
            info
        );
    },

    async deleteItem(parent, args, context, info) {
        //Take a copy of the updates
        const where = { id: args.id };
        const item = await context.db.query.item({ where }, `{ id title }`);
        // TODO: Check permissions
        return context.db.mutation.deleteItem({ where }, info);
    }
};

module.exports = mutations;
