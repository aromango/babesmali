<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Animal;

class AnimalSeeder extends Seeder
{
    
public function run()
{
    Animal::create([
        'izena' => 'Txakur',
        'espeziea' => 'Txakurra',
        'arraza' => 'Labrador',
        'adina' => 3,
        'egoera' => 'eskuragarri',
        'argazkia' => '/images/labrador.jpg',
    ]);

    Animal::create([
        'izena' => 'Miau',
        'espeziea' => 'Katua',
        'arraza' => 'Europearra',
        'adina' => 2,
        'egoera' => 'eskuragarri',
        'argazkia' => '/images/europeo.jpg',
    ]);

    Animal::create([
        'izena' => 'Beltza',
        'espeziea' => 'Txakurra',
        'arraza' => 'Pastor Alemana',
        'adina' => 5,
        'egoera' => 'adoptatua',
        'argazkia' => '/images/aleman.jpg',
    ]);

    Animal::create([
        'izena' => 'Txuri',
        'espeziea' => 'Untxia',
        'arraza' => 'Nano',
        'adina' => 1,
        'egoera' => 'eskuragarri',
        'argazkia' => '/images/untxia.jpg',
    ]);

    Animal::create([
        'izena' => 'Kantu',
        'espeziea' => 'Txoria',
        'arraza' => 'Kanarioa',
        'adina' => 1,
        'egoera' => 'eskuragarri',
        'argazkia' => '/images/kanario.jpg',
    ]);

    Animal::create([
        'izena' => 'Maskor',
        'espeziea' => 'Dortoka',
        'arraza' => 'Uretakoa',
        'adina' => 8,
        'egoera' => 'eskuragarri',
        'argazkia' => '/images/dortoka.jpg',
    ]);
}}