# README

`Trigger` is just another way to scale out [Gatling](http://gatling.io/).

## Introduction

Offically, `Gatling` provides the [batch](http://gatling.io/docs/2.2/cookbook/scaling_out/) way to scale out. But it's not very convenient as 1). it supports Linux only; 2). it doesn't have a friendly UI. So `Trigger` was here to fill the gap.

`Trigger` consists of two parts: a `controller`(rails app) and a `generator`(ruby script ran locally).

The idea is very simple:
  - You edit the `schedules` from `controller`. 
  - The `generator` will fetch the `schedules` from `controller`.
  - The `generator` will execute the command defined in `schedules`.

## Prerequisites

`Ruby`, `Rails`, `React`, `MongoDB` and `Material UI` are used to build `Trigger`. 

Before setup `Trigger` locally, you need to confirm following tools has been installed: 

  - npm
  - ruby
  - mongodb

Here's how I check mine:

    shell$ npm -v
    4.0.5
    shell$ ruby -v
    ruby 2.3.3p222 (2016-11-21 revision 56859) [x86_64-darwin16]
    shell$ mongo --version
    MongoDB shell version: 3.2.11
    shell$ 

## Public server

You could visit https://trigger-sample.herokuapp.com/ to give it a try first.

## Setup

#### get source

`git clone https://github.com/keegoo/trigger`

#### resolve dependencies

```shell
shell$ gem install bundle
shell$ cd trigger/
shell$ bundle install
shell$ rake setup:all
```

#### start server

```shell
rails s
```

#### done

Open `localhost:3000` to take a look!
