"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = exports.dataORM = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
exports.dataORM = new typeorm_1.DataSource({
    type: 'postgres',
    entities: [entities_1.TimeTraveller, entities_1.Violation, entities_1.InfractionSeverity],
    synchronize: true
});
async function dbConfig() {
    exports.dataORM.setOptions({ url: 'postgres://postgres:1234@192.168.2.101:5433/postgres' });
    await exports.dataORM.initialize();
}
exports.dbConfig = dbConfig;
