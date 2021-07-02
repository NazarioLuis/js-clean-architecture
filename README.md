# Clean Architecture implementation written in NodeJS

## Arquitectura clean implementada en NodeJS
Este repositorio tiene código base de la implemtación de la arquitectura clean en **javascript** utilizando NodeJS.
En el código incluyen tres capas de la arquitectura:

* Capa de dominio: donde se implentan los modelos y las reglas del negocio por medio del comportamiento (behavior) de los modelos.

* Capa de aplicación: implementación de la lógica de la aplicación según los casos de uso.

* Capa de infraestructura: implementación de la estrategía de persistencia utilizando los modelos de la capa de dominio.

### La representación gráfica de las capas
El siguiente gráfico ilustra la arquitectura de las tres capas
! [Imagen] (https://drive.google.com/file/d/1evJ641JKXj9_07FFgLSLp03J5CjwAPrD/view?usp=sharing)

### Comunicación entre capas
La comunicación entre las capas está representada por el siguiente gráfico
! [Imagen] (https://drive.google.com/file/d/1qx7HKSPdwdFS5TYhRx6deYUuxIm11cGG/view?usp=sharing)

También se incluye un ejemplo básico de la utilización de la arquitectura con un modelo User implementado en cada capa y su respectivo test. 
