.PHONY: run
run:
	yarn run start

.PHONY: test-e2e
test-e2e:
	npm run test:e2e

.PHONY: test
test:
	npm run test -- ${name}.service

.PHONY: cl
cl:
	#make name=test m
	nest generate class $(name)

.PHONY: m
m:
	#make name=test m
	nest generate module $(name)

.PHONY: c
c:
	nest generate controller $(name)

.PHONY: s
s:
	nest generate service $(name)

.PHONY: r
r:
	nest generate resolver $(name)

.PHONY: cl
cl:
	nest generate class $(name)

.PHONY: f
f:
	nest generate filter $(name)

.PHONY: g
g:
	nest generate guard $(name)

.PHONY: i
i:
	nest generate interceptor $(name)

.PHONY: p
p:
	nest generate pipe $(name)

.PHONY: pr
pr:
	nest generate provider $(name)

.PHONY: mi
mi:
	nest generate middleware $(name)


.PHONY: dep
dep:
	npm i --save-dev class-validator class-transformer \
 	@nestjs/mapped-types  @nestjs/graphql @nestjs/apollo @nestjs/config @nestjs/swagger @nestjs/mongoose \
 	@prisma/client prisma \
 	apollo-server-express \
 	graphql apollo-server-express \
 	typeorm \
 	@types/hapi__joi @types/mongoose \
 	@hapi/joi \
 	swagger-ui-express \
 	mongoose \
 	ts-morph \
 	graphql-subscriptions \
 	dataloader

.PHONY: migrate
migrate:
	npx prisma migrate dev --name init

.PHONY: studio
studio:
	npx prisma studio

.PHONY: generate
generate:
	npx ts-node generate-types