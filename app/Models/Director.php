<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Director extends Model
{
    protected $table = 'director';

    protected $fillable = [
        'nombre',
        'fecha_de_nacimiento',
        'biografia',
    ];

    protected function casts(): array
    {
        return [
            'fecha_de_nacimiento' => 'date',
        ];
    }
}