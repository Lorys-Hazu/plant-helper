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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const auth_service_1 = require("./auth.service");
const database_service_1 = require("../database/database.service");
const jwt_1 = require("@nestjs/jwt");
const login_user_dto_1 = require("./dto/login-user.dto");
let AuthController = class AuthController {
    constructor(authService, db, jwtService) {
        this.authService = authService;
        this.db = db;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const hashedPassword = await this.authService.hashPassword(createUserDto.password);
        const user = await this.db.user.create({
            data: { ...createUserDto, password: hashedPassword },
        });
        return { ...user, password: undefined };
    }
    async login(loginUserDto) {
        const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_2.Post)('register'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_2.Post)('login'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        database_service_1.DatabaseService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map