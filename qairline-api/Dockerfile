FROM ubuntu:latest
LABEL authors="cuongnv"

FROM maven:3.9.9-ibm-semeru-23-jammy AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:22-jdk-slim

WORKDIR /app

COPY --from=builder /app/target/demosql-0.0.1-SNAPSHOT.jar app.jar

COPY --from=builder /app/images images

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

