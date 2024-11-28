const AutoIncrement = require('mongoose-sequence'); 

function addBaseEntity(schema, mongoose) {
    schema.add({
        createdBy: { type: String },
        updatedBy: { type: String },
    });

    schema.set('timestamps', { createdAt: 'createdOn', updatedAt: 'updatedOn' });

    schema.pre('save', function (next) {
        this.createdOn = new Date();
        this.createdBy = this._createdBy || this.createdBy; 
        next();
    });

    schema.pre('findOneAndUpdate', function (next) {
        this.set({ 
            updatedOn: new Date(),
            updatedBy: this._updatedBy || this.updatedBy,
        });
        next();
    });

    return schema;
}

module.exports = {
    addBaseEntity,
};
