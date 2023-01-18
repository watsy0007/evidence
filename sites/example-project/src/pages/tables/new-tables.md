```tableq
select date('2020-04-30') as date, 87 as value_usd, 'Austria' as country, 'B' as category, 100384 as country_id
union all
select date('2020-05-01') as date, 9594 as value_usd, 'Australia' as country, 'C' as category, 104942 as country_id
union all
select date('2020-05-02') as date, 16328 as value_usd, 'Brazil' as country, 'A' as category, 100842 as country_id
union all
select date('2020-05-03') as date, 174 as value_usd, 'Canada' as country, 'A' as category, 104975 as country_id
union all
select date('2020-05-04') as date, 214 as value_usd, 'Chile' as country, 'B' as category, 100644 as country_id
union all
select date('2020-05-05') as date, 342 as value_usd, 'Denmark' as country, 'B' as category, 102948 as country_id
union all
select date('2020-05-06') as date, 331 as value_usd, 'Estonia' as country, 'D' as category, 102495 as country_id
union all
select date('2020-05-07') as date, 98 as value_usd, 'Finland' as country, 'B' as category, 104962 as country_id
union all
select date('2020-05-08') as date, 128 as value_usd, 'Ghana' as country, 'C' as category, 100599 as country_id
union all
select date('2020-05-09') as date, 153 as value_usd, 'Honduras' as country, 'D' as category, 102494 as country_id
union all
select date('2020-05-10') as date, 384 as value_usd, 'India' as country, 'A' as category, 101948 as country_id
union all
select date('2020-05-11') as date, 234 as value_usd, 'Ireland' as country, 'B' as category, 100987 as country_id
union all
select date('2020-05-12') as date, 67 as value_usd, 'Jamaica' as country, 'C' as category, 101248 as country_id
union all
select date('2020-05-13') as date, 125 as value_usd, 'Kenya' as country, 'C' as category, 101947 as country_id
union all
select date('2020-05-14') as date, 118 as value_usd, 'Lebanon' as country, 'D' as category, 108849 as country_id
union all
select date('2020-05-15') as date, 263 as value_usd, 'Mexico' as country, 'B' as category, 100763 as country_id
union all
select date('2020-05-16') as date, 211 as value_usd, 'Nigeria' as country, 'A' as category, 100837 as country_id
union all
select date('2020-05-17') as date, 192 as value_usd, 'Oman' as country, 'D' as category, 100993 as country_id
union all
select date('2020-05-18') as date, 59 as value_usd, 'Philippines' as country, 'D' as category, 104128 as country_id
union all
select date('2020-05-19') as date, 113 as value_usd, 'Qatar' as country, 'C' as category, 100181 as country_id
union all
select date('2020-05-20') as date, 190 as value_usd, 'Romania' as country, 'A' as category, 101384 as country_id
union all
select date('2020-05-21') as date, 190 as value_usd, 'Sweden' as country, 'B' as category, 101847 as country_id
union all
select date('2020-05-22') as date, 248 as value_usd, 'Thailand' as country, 'C' as category, 104837 as country_id
union all
select date('2020-05-23') as date, 168 as value_usd, 'Ukraine' as country, 'C' as category, 101938 as country_id
union all
select date('2020-05-24') as date, 101 as value_usd, 'Vietnam' as country, 'A' as category, 104948 as country_id
union all
select date('2020-05-25') as date, 67 as value_usd, 'Yemen' as country, 'B' as category, 100774 as country_id
union all
select date('2020-05-26') as date, 100 as value_usd, 'Zimbabwe' as country, 'A' as category, 100337 as country_id
```

<DataTable data={tableq} search=true sortable=true rows=10 downloadable=true>
    <Column id=date/>
    <Column id=country_id label = "Country ID" align=center/>
    <Column id=country/>
    <Column id=category/>
    <Column id=value_usd/>
</DataTable>