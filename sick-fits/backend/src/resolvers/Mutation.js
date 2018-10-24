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
        console.log(updates, args.id)
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
    }
};

module.exports = mutations;
