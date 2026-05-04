<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = [
        'izena',
        'espeziea',
        'arraza',
        'adina',
        'egoera',
        'argazkia',
    ];

   
    public function adoptions()
    {
        return $this->hasMany(Adoption::class);
    }
}