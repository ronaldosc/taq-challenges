"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Violation = exports.InfractionSeverity = exports.TimeTraveller = void 0;
const typeorm_1 = require("typeorm");
let TimeTraveller = class TimeTraveller {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TimeTraveller.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeTraveller.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimeTraveller.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TimeTraveller.prototype, "passport", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Violation, (violation) => violation.time_traveller, { nullable: true }),
    __metadata("design:type", Array)
], TimeTraveller.prototype, "violations", void 0);
TimeTraveller = __decorate([
    (0, typeorm_1.Entity)('time_traveller')
], TimeTraveller);
exports.TimeTraveller = TimeTraveller;
let InfractionSeverity = class InfractionSeverity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InfractionSeverity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfractionSeverity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InfractionSeverity.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Violation, (violation) => violation.severity, { nullable: true }),
    __metadata("design:type", Array)
], InfractionSeverity.prototype, "violations", void 0);
InfractionSeverity = __decorate([
    (0, typeorm_1.Entity)('infraction_severity')
], InfractionSeverity);
exports.InfractionSeverity = InfractionSeverity;
let Violation = class Violation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Violation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Violation.prototype, "passport", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Violation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Violation.prototype, "occurred_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TimeTraveller),
    __metadata("design:type", TimeTraveller)
], Violation.prototype, "time_traveller", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InfractionSeverity),
    __metadata("design:type", InfractionSeverity)
], Violation.prototype, "severity", void 0);
Violation = __decorate([
    (0, typeorm_1.Entity)('violation')
], Violation);
exports.Violation = Violation;
